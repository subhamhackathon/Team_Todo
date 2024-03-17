# importing required modules 
from PyPDF2 import PdfReader 
from openai import AzureOpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import io
import re
from bs4 import BeautifulSoup
  
app = Flask(__name__)  

CORS(app, support_credentials=True)

client = AzureOpenAI(
                  azure_endpoint = "https://team-todo.openai.azure.com/openai/deployments/test-aj/chat/completions?api-version=2024-02-15-preview", 
                  api_key="e347916c17ca472cb05c1469a1fc5836",  
                  api_version="2024-02-15-preview"
                )


def getAnswersFromPDF(urls, entity): 
            
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
                      6. Is there a employee health and Safety audit target mentioned in the text? give response only in the format Yes/No(Reason)? \
                      7. Is there a supply audit target mentioned in the text? give response only in the format Yes/No(Reason)? \
                      8. Is there a GRI rating mentioned in the text? give response only in the format Yes/No(Reason)? \
                      9. Is there a SASB rating mentioned in the text? give response only in the format Yes/No(Reason)? \
                      10. Is there a ESG assurance rating mentioned in the text? give response only in the format Yes/No(Reason)? \
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

                healthAndSafetyTargetQ = {
                    "question": "what is the employee health and Safety audit target",
                    "esgType": "Goverance",
                    "esgIndicators": "HealthAndSafetyTarget",
                    "primaryDetails": primary["6"] if "6" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("6"," Employee Health and Safety audit ",secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }

                supplyAuditTargetQ = {
                    "question": "what is supply audit target",
                    "esgType": "Goverance",
                    "esgIndicators": "SupplyAuditTarget",
                    "primaryDetails": primary["7"] if "7" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("7"," Supply Audit ",secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }

                griRatingQ = {
                    "question": "what is the GRI rating",
                    "esgType": "Reporting",
                    "esgIndicators": "GRI",
                    "primaryDetails": primary["8"] if "8" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("8"," GRI rating ",secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }

                sasbRatingQ = {
                    "question": "what is the SASB rating",
                    "esgType": "Reporting",
                    "esgIndicators": "SASB",
                    "primaryDetails": primary["9"] if "9" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("9"," SASB Rating ",secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }

                esgAssuranceQ = {
                    "question": "is the entity focussing on ESG assurance",
                    "esgType": "Reporting",
                    "esgIndicators": "Assurance",
                    "primaryDetails": primary["10"] if "10" in primary else "No",
                    "secondaryDetails": getSecondaryAnswer("10"," ESG Assurance ",secondary),
                    "citationDetails": "",
                    "pageNumber": 1
                }

                esgRiskRatingMSCIQ = {
                    "question": "ESG Risk Rating for MSCI",
                    "esgType": "ESGScore",
                    "esgIndicators": "MSCISustainalytics",
                    "primaryDetails": getESGRating(entity),
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }

                sbtIQ = {
                    "question": "what is the SBTi rating",
                    "esgType": "Reporting",
                    "esgIndicators": "SBTi",
                    "primaryDetails": "",
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }

                cDPQ = {
                    "question": "what is the CDP rating",
                    "esgType": "Reporting",
                    "esgIndicators": "CDP",
                    "primaryDetails": "",
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }

                tCFDQ = {
                    "question": "what is the TCFD rating",
                    "esgType": "Reporting",
                    "esgIndicators": "TCFD",
                    "primaryDetails": "",
                    "secondaryDetails": "",
                    "citationDetails": "",
                    "pageNumber": 1
                }

                esgResponseList.append({
                "entityName": entity,
                "benchmarkDetails": [netZeroTargetQ,emissionReductionQ,renewableElectricityQ,circularityStratergyQ,diversityQ,healthAndSafetyTargetQ,supplyAuditTargetQ,griRatingQ,sasbRatingQ,esgAssuranceQ,esgRiskRatingMSCIQ,sbtIQ,cDPQ,tCFDQ]
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


def getESGRating(entity):
  Esg_entity={"graco" : 'https://www.sustainalytics.com/esg-rating/graco-inc/1007907359',"nordson" :'https://www.sustainalytics.com/esg-rating/nordson-corp/1008021860',"spx":'https://www.sustainalytics.com/esg-rating/spx-technologies-inc/2012243037'}
  # Send a GET request to the URL
  response = requests.get(Esg_entity[entity])

  # Parse the HTML content
  soup = BeautifulSoup(response.text, 'html.parser')

  # Find the <div> element with class "row company-details"
  company_details_div = soup.find('div', class_='row company-details')

  # Check if the company details div is found
  if company_details_div:
      # Find the <div> element with class "col-6 risk-rating-score" within the company details div
      risk_rating_div = company_details_div.find('div', class_='col-6 risk-rating-score')

      # Check if the risk rating div is found
      if risk_rating_div:
          # Find the <span> element within the risk rating div
          risk_rating_span = risk_rating_div.find('span', class_='')

          # Check if the span element is found
          if risk_rating_span:
              # Extract the text content from the span element
              ESG_rating = risk_rating_span.text.strip()
              print("Risk Rating Score:", ESG_rating)
          else:
              print("No span element found within the risk rating div.")
      else:
          print("No div element with class 'col-6 risk-rating-score' found within the company details div.")
  else:
      print("No div element with class 'row company-details' found on the page.")
  return ESG_rating
  
def getCDPRating(entity):
  CDP_entity={"graco" : 'https://www.cdp.net/en/responses?queries%5Bname%5D=graco',"nordson" :'https://www.cdp.net/en/responses?queries%5Bname%5D=Nordson',"spx":'https://www.cdp.net/en/responses/828001/SPX-Technologies-Inc?back_to=https%3A%2F%2Fwww.cdp.net%2Fen%2Fresponses%3Fqueries%255Bname%255D%3Dspx&queries%5Bname%5D=spx'}
  # Send a GET request to the URL
  response = requests.get(CDP_entity[entity])

  # Parse the HTML content
  sou# Parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find all <div> elements with class "investor-program__score_link"
score_link_divs = soup.find_all('div', class_='investor-program__score_link')

# Flag to keep track if the score is found
score_found = False
# Iterate over each score link div
for score_link_div in score_link_divs:
    # Check if the score link div contains the specific score band div
    score_band_div = score_link_div.find('div', class_='investor-program_score_band_single tooltip-top investor-program_score_band--climate-change')
    if score_band_div:
        # Find the parent <td> element containing the score band div
        parent_td = score_band_div.find_parent('td', class_='search_results__response_score_band')
        if parent_td:
            # Extract the text content from the parent <td> element
            score = parent_td.text.strip()
            print("Climate Change Score:", score)
            # Set flag to True to indicate score is found
            score_found = True
            # Break out of the loop once the score is found
            break

# If no score is found, print a message
if not score_found:
    print("No climate change score found on the page.")
  return score


@app.route('/ESGReport')  
@cross_origin(supports_credentials=True)
def hello():  
  url = request.args.get('pdf', 'spx.pdf')  
  entity = request.args.get('entity', 'spx') 
  return getAnswersFromPDF(url,entity)


if __name__ == '__main__':  
    app.run(debug=True)  
