# importing required modules 
from PyPDF2 import PdfReader 
from openai import AzureOpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import io
import re
  
app = Flask(__name__)  
CORS(app, support_credentials=True)

client = AzureOpenAI(
                  azure_endpoint = "https://team-todo.openai.azure.com/openai/deployments/test-aj/chat/completions?api-version=2024-02-15-preview", 
                  api_key="e347916c17ca472cb05c1469a1fc5836",  
                  api_version="2024-02-15-preview"
                )


def getAnswersFromPDF(urls, entity): 
            print(urls)
            esgResponseList = []
            for itemurl in urls.split('|'):
            
                url, entity = itemurl.split('&entity=')                
                # Send a GET request to the URL and get the response  
                response = requests.get(url)  
                  
                # Read the content of the response into a BytesIO object  
                pdf_bytes = io.BytesIO(response.content)  
                  
                # Create a PDF reader object from the BytesIO object  
                # pdf_reader = PyPDF2.PdfFileReader(pdf_bytes)  


                # creating a pdf reader object 
                reader = PdfReader(pdf_bytes) 

                

                expr = re.compile("[0-5]?\\. (.*?) (.*)")

                primary={}
                secondary={}

                for page_num in range(len(reader.pages)):  
                                  # getting a specific page from the pdf file 
                  page = reader.pages[page_num] 

                  # extracting text from page 
                  text = page.extract_text() 
                  #print(text) 

                  if len(text.split()) < 20:
                    continue

                  message_text = [
                  {"role":"system","content":"You are an AI assistant that will understand the text provided by the user and give response only in the format Yes/No(Reason)"},
                  {"role":"user","content":text},
                  {"role":"user","content":"read the above text and give a yes or no answer for below questions - \
                      1. Is there a traget for Net Zero emissions mentioned in the text?  give response only in the format Yes/No(Reason) \
                      2. Is there a target for Diversity, Equity and Inclusion mentioned in the text? give response only in the format Yes/No(Reason)? \
                      3. Is there an adopted goal for reducing emission intensity mentioned in the text? give response only in the format Yes/No(Reason)? \
                      4. Is there a Renewable Electricity Target mentioned in the text? give response only in the format Yes/No(Reason)? \
                      5. Is there a Circularity Stratergy & targets mentioned in the text? give response only in the format Yes/No(Reason)? \
                      "
                      }
                  ]


                  completion = client.chat.completions.create(
                    model="test-aj", # model = "deployment_name"
                    messages = message_text,
                    temperature=0.4,
                    max_tokens=800,
                    top_p=0.95,
                    frequency_penalty=0,
                    presence_penalty=0,
                    stop=None
                  )

                  print(page_num)

                  print()
                  ans = completion.choices[0].message.content

                  print(ans)

                  lines = ans.splitlines()

             
                  i=1
                  for line in lines:
                    result = expr.search(line)
                    present=result.group(1)
                    reason=result.group(2)
                    if present == "Yes":
                      primary[str(i)]=present
                      if str(i) in secondary:
                        secondary[str(i)]=secondary[str(i)] + ". " + reason
                      else:
                        secondary[str(i)]=reason
                    i=i+1 



                print(primary)
                print(secondary)
                
                netZeroTargetQ = {
                    "question": "what is net zero target",
                    "esgType": "Environment",
                    "esgIndicators": "NetZeroTarget",
                    "primaryDetails": primary["1"] if "1" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("1"," Net Zero emission ",secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }


                diversityQ = {
                    "question": "what is the Diversity, Equity and Inclusion target",
                    "esgType": "Social",
                    "esgIndicators": "DE&ITarget",
                    "primaryDetails": primary["2"] if "2" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("2"," Diversity, Equity and Inclusion ", secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }


                emissionReductionQ = {
                    "question": "what is the interim emission reduction target",
                    "esgType": "Environment",
                    "esgIndicators": "InterimEmissionsReductionTarget",
                    "primaryDetails": primary["3"] if "3" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("3"," emission reduction " ,secondary),
                    "citationDetails": "string",
                    "pageNumber": 1
                }


                renewableElectricityQ = {
                    "question": "what is the Renewable Electricity Target",
                    "esgType": "Environment",
                    "esgIndicators": "RenewableElectricityTarget",
                    "primaryDetails": primary["4"] if "4" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("4"," Renewable Electricity " ,secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }


                circularityStratergyQ = {
                    "question": "what is the Circularity Stratergy & targets",
                    "esgType": "Environment",
                    "esgIndicators": "CircularityStratergy",
                    "primaryDetails": primary["5"] if "5" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("5"," Circularity Stratergy ",secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }


                esgResponseList.append({
                "entityName": entity,
                "benchmarkDetails": [netZeroTargetQ,emissionReductionQ,renewableElectricityQ,circularityStratergyQ,diversityQ]
                })

            esgResponse = {
                    "esgResponse": esgResponseList
            }
                
            # Return user data as JSON object  
            return jsonify(esgResponse)


def getSecondaryAnswer(key, targetName , secondary):
  secondary_ans = ""
  if key in secondary:
    message_text = [
                      {"role":"system","content":"You are an AI assistant that will understand the text provided by the user and give response"},
                      {"role":"user","content":"is there a specific target for" + targetName +  "mentioned in the below text??\
                      Response should only have the target number and year. No extra words or reasoning . \
                      Return one word 'No' if no target is mentioned. \
                      \
                      " + secondary[key]}
                    ]
    completion = client.chat.completions.create(
      model="test-aj", # model = "deployment_name"
      messages = message_text,
      temperature=0.7,
      max_tokens=800,
      top_p=0.95,
      frequency_penalty=0,
      presence_penalty=0,
      stop=None
    )
    secondary_ans = "" if completion.choices[0].message.content == "No." else completion.choices[0].message.content
  return secondary_ans


@app.route('/ESGReport') 
@cross_origin(supports_credentials=True) 
def hello():  
  url = request.args.get('pdf', 'spx.pdf')  
  entity = request.args.get('entity', 'spx') 
  return getAnswersFromPDF(url,entity)


if __name__ == '__main__':  
    app.run(debug=True)  
