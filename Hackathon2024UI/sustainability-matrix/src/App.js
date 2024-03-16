import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar,Toolbar, Typography, Container, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, makeStyles  } from '@material-ui/core';
import './Loader.css'; // Import CSS for loader styling
import EsgResponseGrid from './EsgResponseGrid';

const useStyles = makeStyles((theme) => ({
  footer: {
    
    color: theme.palette.primary.dark,
    padding: theme.spacing(1),
    textAlign: 'right',
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleButtonClick = () => {
    // Handle button click (e.g., send URL to API)
    fetchData(url); 
  };

  const fetchData = async (url) => {
    debugger;
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Reset error state
    try {
      const headers = {
        "Content-Type": "application/json"
      };
      //const apiUrl = `http://localhost:5141/api/Sustainability/ConnectOpenAPI?question=${encodeURIComponent(url)}`;
      //const apiUrl = `http://localhost:5000/ESGReport?pdf=spx.pdf&entity=spx`;
      //const response = await axios.get('http://localhost:5141/api/Sustainability/ConnectOpenAPI?question=Hellow%20How%20are%20u%20HHkjhkjhfkdhfkjhsdkhf');
      
      //const apiUrl = `http://localhost:5000/ESGReport?pdf=https://www.spx.com/wp-content/uploads/2023/09/SPX_SustainabilityReport_2022_FINAL.pdf&entity=spx`;
      
      const apiUrl = `http://localhost:5000/ESGReport?pdf=${encodeURIComponent(url)}&entity=spx`;
      var response = await axios.get(apiUrl,{ headers }); // Change the URL to your .NET Core API endpoint
      
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message); // Set error state if an error occurs
    }
    finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (   
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
          Sustainability Targets and Disclosures
          </Typography>
        </Toolbar>
      </AppBar>
    <Container>      
      
      <div style={{marginTop:'50px', marginLeft:'25px'}}>
      {/* <textarea
        placeholder="Enter URL here..."
        value={url}
        onChange={handleUrlChange}
        rows={4}
        cols={50}
      /> */}
      <h4>Please provide PDF url...</h4>
      <TextField
            placeholder="Enter URL here..."
            value={url}
            onChange={handleUrlChange}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
      <br />
      <br />
      
      <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={loading}>Generate Report</Button>
      
    </div>

    <div style={{marginTop:'25px', marginLeft:'25px', marginBottom:'25px'}}>
        <h2 style={{textAlign:'center'}}>Comparing Sustainability Targets and Disclosures in Industrial Machinery</h2>
    </div>

    {loading ? (
       <div className="loader-container">
       <div className="loader-text">Loading...</div>
       <div className="loader-circle"></div>
     </div>
      ) : (

        <div style={{marginTop:'50px'}}>
        <EsgResponseGrid data={data} />
      </div>
)}
{error && <div>Error: {error}</div>} {/* Render error message if an error occurs */}
    

      <div className={classes.footer}>
        <Typography variant="body2">Team TODO Hackathon 2024</Typography>
      </div>
      </Container>
    </div>
  );
}

export default App;