import React from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const tick = "Yes";
const dot = "No";

function EsgResponseGrid({ data }) {
  return (
    <Container>
      {data && data.esgResponse && data.esgResponse.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white', textAlign: 'center', fontWeight:'bold'}}>Company</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'darkblue', color:'white' , textAlign: 'center',fontWeight:'bold'}}>ESG Score</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'darkgreen', color:'white', textAlign: 'center',fontWeight:'bold'}} colSpan={4}>Environmental</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'blue', color:'white', textAlign: 'center',fontWeight:'bold' }}>Social</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'yellow', color:'black' , textAlign: 'center',fontWeight:'bold' }} colSpan={2}>Governance</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white', textAlign: 'center',fontWeight:'bold'}} colSpan={6}>Reporting</TableCell>              
            </TableRow>
            <TableRow>
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white' , textAlign: 'center'}}></TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'darkblue', color:'white', textAlign: 'center', fontWeight:'bold'}}>MSCI Sustainalytics</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'darkgreen', color:'white' , textAlign: 'center', fontWeight:'bold'}}>Net Zero Target</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'darkgreen', color:'white', textAlign: 'center', fontWeight:'bold'}}>Interim Emissions Reduction Target</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'darkgreen', color:'white', textAlign: 'center', fontWeight:'bold'}}>Renewable Electricity Target</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'darkgreen', color:'white',textAlign: 'center', fontWeight:'bold' }}>Circularity Strategy & Targets</TableCell> 
              <TableCell style={{ border: '1px solid white', backgroundColor:'blue', color:'white',textAlign: 'center', fontWeight:'bold'}}>Diversity, Equity, and Inclusion Target</TableCell>   
              <TableCell style={{ border: '1px solid white', backgroundColor:'yellow', color:'black',textAlign: 'center', fontWeight:'bold'}}>Employee Health & Safety Audits</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'yellow', color:'black',textAlign: 'center', fontWeight:'bold'}}>Supply Chain Audits</TableCell> 
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white', textAlign: 'center', fontWeight:'bold'}}>SBTi</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white',textAlign: 'center', fontWeight:'bold'}}>CDP</TableCell>
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white',textAlign: 'center', fontWeight:'bold'}}>GRI</TableCell> 
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white',textAlign: 'center', fontWeight:'bold' }}>SASB</TableCell>             
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white',textAlign: 'center', fontWeight:'bold' }}>TCFD</TableCell>  
              <TableCell style={{ border: '1px solid white', backgroundColor:'grey', color:'white',textAlign: 'center', fontWeight:'bold'  }}>Assurance</TableCell>                        
            </TableRow>
          </TableHead>
          <TableBody>
          {data.esgResponse.map((response, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell style={{ border: '1px solid black',textAlign: 'center' }}>{response.entityName}</TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.primaryDetails
                                )}  
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.secondaryDetails
                                )}  
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "ESGScore" && detail.esgIndicators === "MSCISustainalytics")?.citationDetails
                                )}  
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.primaryDetails
                                )}                        
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "NetZeroTarget")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.primaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "InterimEmissionsReductionTarget")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.primaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "RenewableElectricityTarget")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.primaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Environment" && detail.esgIndicators === "CircularityStratergy")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.primaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Social" && detail.esgIndicators === "DE&ITarget")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.primaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                                {response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "SuppluAuditTarget")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.primaryDetails
                                )} 
                        </div>
                        <div>
                            {response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "SuppluAuditTarget")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "SuppluAuditTarget")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Goverance" && detail.esgIndicators === "HealthAndSafetyTarget")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.primaryDetails
                                )} 
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.secondaryDetails
                                )} 
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SBTi")?.citationDetails
                                )} 
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.primaryDetails
                                )} 
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.secondaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "CDP")?.citationDetails
                                )}
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.primaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.secondaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "GRI")?.citationDetails
                                )}
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.primaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.secondaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "SASB")?.citationDetails
                                )}
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.primaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.secondaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "TCFD")?.citationDetails
                                )}
                        </div>                        
                    </TableCell>
                    <TableCell style={{ border: '1px solid black', textAlign: 'center'  }}>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.primaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.primaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.primaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.secondaryDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.secondaryDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.secondaryDetails
                                )}
                        </div>
                        <div>
                        {response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.citationDetails === tick ? (
                                            <CheckCircleIcon style={{ color: 'green' }} />
                                ) : response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.citationDetails === dot ? (
                                            <FiberManualRecordIcon  style={{ color: 'red' }} />
                                ) : (
                                    response.benchmarkDetails.find(detail => detail.esgType === "Reporting" && detail.esgIndicators === "Assurance")?.citationDetails
                                )}
                        </div>                        
                    </TableCell>
                  </TableRow>
                  
                </React.Fragment>
              ))}
          </TableBody>
          
        </Table>
      )}
    </Container>
  );
}

export default EsgResponseGrid;