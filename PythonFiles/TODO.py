# importing required modules 
from PyPDF2 import PdfReader 
from openai import AzureOpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import io
  
app = Flask(__name__)  
CORS(app, support_credentials=True)

def getAnswersFromPDF(url, entity): 

                  # Send a GET request to the URL and get the response  
                response = requests.get(url)  
                  
                # Read the content of the response into a BytesIO object  
                pdf_bytes = io.BytesIO(response.content)  
                  
                # Create a PDF reader object from the BytesIO object  
            #    pdf_reader = PyPDF2.PdfFileReader(pdf_bytes)  


                # creating a pdf reader object 
                reader = PdfReader(pdf_bytes) 

                # printing number of pages in pdf file 
                print(len(reader.pages)) 

                # getting a specific page from the pdf file 
                page = reader.pages[1] 

                # extracting text from page 
                text = page.extract_text() 
                #print(text) 




                client = AzureOpenAI(
                  azure_endpoint = "https://team-todo.openai.azure.com/openai/deployments/test-aj/chat/completions?api-version=2024-02-15-preview", 
                  api_key="e347916c17ca472cb05c1469a1fc5836",  
                  api_version="2024-02-15-preview"
                )


                message_text = [{"role":"system","content":"You are an AI assistant that helps people find information."},{"role":"user","content":text},{"role":"user","content":"what is the adopted goal for reducing emission intensity? Answer only with number and timeframe."}]

                print("Question : what is the adopted goal for reducing emission intensity? Answer only with number.")

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

                print()
                print(completion)

                emissionReductionQ = {
                    "question": "what is the interim emission reduction target",
                    "esgType": "Environment",
                    "esgIndicators": "InterimEmissionsReductionTarget",
                    "primaryDetails": completion.choices[0].message.content,
                    "secondaryDetails": "",
                    "citationDetails": "string",
                    "pageNumber": 1
                }


                message_text = [{"role":"system","content":"You are an AI assistant that helps people find information."},{"role":"user","content":text},{"role":"user","content":"Is there a Diversity, Equity and Inclusion target? Answer should be 'yes' or 'no' or unclear' only."}]

                print()
                print("Is there a Diversity, Equity and Inclusion target? Answer in yes or no only.")
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

                print(completion.choices[0].message.content)

                diversityQ = {
                    "question": "what is the Diversity, Equity and Inclusion target",
                    "esgType": "Social",
                    "esgIndicators": "DE&ITarget",
                    "primaryDetails": completion.choices[0].message.content,
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }

                message_text = [{"role":"system","content":"You are an AI assistant that helps people find information."},{"role":"user","content":text},{"role":"user","content":"Is there a net zero target? Answer should be 'yes' or 'no' or unclear' only."}]

                print()
                print("Is there a net zero target? Answer in yes or no only.")
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

                print(completion.choices[0].message.content)

                netZeroTargetQ = {
                    "question": "what is net zero target",
                    "esgType": "Environment",
                    "esgIndicators": "NetZeroTarget",
                    "primaryDetails": completion.choices[0].message.content,
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }


                message_text = [{"role":"system","content":"You are an AI assistant that helps people find information."},{"role":"user","content":text},{"role":"user","content":"Is there a Renewable Electricity Target? Answer should be 'yes' or 'no' or unclear' only."}]

                print()
                print("Is there a Renewable Electricity Target? Answer in yes or no only.")
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

                print(completion.choices[0].message.content)

                renewableElectricityQ = {
                    "question": "what is the Renewable Electricity Target",
                    "esgType": "Environment",
                    "esgIndicators": "RenewableElectricityTarget",
                    "primaryDetails": completion.choices[0].message.content,
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }

                message_text = [{"role":"system","content":"You are an AI assistant that helps people find information."},{"role":"user","content":text},{"role":"user","content":"Is there a Circularity Stratergy & targets? Answer should be 'yes' or 'no' or unclear' only."}]

                print()
                print("Is there a Circularity Stratergy & targets? Answer in yes or no only.")
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

                print(completion.choices[0].message.content)

                circularityStratergyQ = {
                    "question": "what is the Circularity Stratergy & targets",
                    "esgType": "Environment",
                    "esgIndicators": "RenewableElectricityTarget",
                    "primaryDetails": completion.choices[0].message.content,
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }


                esgResponse = {
                  "esgResponse": [
                    {
                      "entityName": entity,
                      "benchmarkDetails": [netZeroTargetQ,emissionReductionQ,renewableElectricityQ,circularityStratergyQ,diversityQ]
                    }
                  ]
                }
                 # Return user data as JSON object  
                return jsonify(esgResponse)



@app.route('/ESGReport')  
@cross_origin(supports_credentials=True) 
def hello():  
  url = request.args.get('pdf', 'spx.pdf')  
  entity = request.args.get('entity', 'spx') 
  return getAnswersFromPDF(url,entity)


if __name__ == '__main__':  
    app.run(debug=True)  