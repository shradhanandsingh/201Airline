import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Table.css";
import Animate from "../components/common/Animate";
import { getFlightList } from "../service/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




const MaterialTable = () => {

  const [flightdata, setFlightData] = useState([])

  const fetchData = async () => {
    try {
      const response = await getFlightList();
      setFlightData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])

  const tableImg = {
    display:"flex",
    alignItems: "center"
  }

  return (
    <>
      <TableContainer component={Paper}>
      <Animate type="fade" delay={0.5}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Flight List</StyledTableCell>
              <StyledTableCell align="center">Flight Number</StyledTableCell>
              <StyledTableCell align="center">From Date</StyledTableCell>
              <StyledTableCell align="center">To Date</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {
              flightdata.map((user) => (
               
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th">
                    <div style={tableImg}>
                   
                    <img src={user.flogo} style={{width:'32px', height:'32px'}} alt={user.name}/>
                     
                      <div style={{marginLeft:'10px'}}>
                        <p><b>{user.name}</b></p>
                      </div>

                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      <b>{user.fnumber}</b>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p><b>{user.from_date}</b></p>
                    <p>{user.from_place}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <p><b>{user.to_date}</b></p>
                    <p>{user.to_place}</p>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button className="ViewFareBtn">View Details</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            }

          </TableBody>
         
        </Table>
        </Animate>
      </TableContainer>
    </>
  );
};

export default MaterialTable;