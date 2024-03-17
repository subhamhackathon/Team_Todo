Please Find Below Instructions on how to Run the App
1. Install the following packages in Python by running the following commands
	pip install PyPDF2
	pip install openai
	pip install flask
	pip install request
	pip install jsonify	
	pip install flask_cors
	pip install bs4
	
2. Run the python API  -  python "TODO.py"
3. Check if API is Running using Url http://localhost:5000/ESGReport?pdf=https://www.spx.com/wp-content/uploads/2023/09/SPX_SustainabilityReport_2022_FINAL.pdf%26entity=spx
4. Install the React packages by going to the React UI folder where code is there and run npm install
5. Run the React App using npm start
6. Give the url for the PDF https://www.spx.com/wp-content/uploads/2023/09/SPX_SustainabilityReport_2022_FINAL.pdf&entity=spx and click on Generate Report
7. If you want to query via Postman use URl http://localhost:5000/ESGReport?pdf=https://www.spx.com/wp-content/uploads/2023/09/SPX_SustainabilityReport_2022_FINAL.pdf%26entity=spx
8. If you want to query for multiple PDF use delimeter '|' to separate PDF urls.
9. Postman query for multiple PDF :   http://localhost:5000/ESGReport?pdf=https://www.spx.com/wp-content/uploads/2023/09/SPX_SustainabilityReport_2022_FINAL.pdf%26entity=spx|https://www.graco.com/content/dam/graco/corporate/literature/misc/Graco-ESG-Report.pdf%26entity=graco
10. In React, if you want to supply multiple PDFs use  : https://www.spx.com/wp-content/uploads/2023/09/SPX_SustainabilityReport_2022_FINAL.pdf&entity=spx|https://www.graco.com/content/dam/graco/corporate/literature/misc/Graco-ESG-Report.pdf&entity=graco