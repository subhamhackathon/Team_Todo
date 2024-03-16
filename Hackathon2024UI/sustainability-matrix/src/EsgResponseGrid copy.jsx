import React from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

function EsgResponseGrid({ data }) {
  return (
    <Container>
      {data && data.esgResponse && data.esgResponse.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entity Name</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>ESG Type</TableCell>
              <TableCell>ESG Indicators</TableCell>
              <TableCell>Primary Details</TableCell>
              <TableCell>Secondary Details</TableCell>
              <TableCell>Citation Details</TableCell>
              <TableCell>Page Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.esgResponse.map((response, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{response.entityName}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                {response.benchmarkDetails.map((detail, detailIndex) => (
                  <TableRow key={detailIndex}>
                    <TableCell></TableCell>
                    <TableCell>{detail.question}</TableCell>
                    <TableCell>{detail.esgType}</TableCell>
                    <TableCell>{detail.esgIndicators}</TableCell>
                    <TableCell>{detail.primaryDetails}</TableCell>
                    <TableCell>{detail.secondaryDetails}</TableCell>
                    <TableCell>{detail.citationDetails}</TableCell>
                    <TableCell>{detail.pageNumber}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default EsgResponseGrid;