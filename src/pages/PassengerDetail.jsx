import React, { useState, useEffect } from "react";
import { Box, TableRow } from '@mui/material';
import Grid from '@mui/material/Grid';
import Header from "../components/common/Header";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import "./flight.css";
import { useParams } from 'react-router-dom';
import { getPassengerId } from "../service/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Animate from "../components/common/Animate";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));




const PassengerDetails = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();
  useEffect(() => {
    loadUserData();
  }, [])
  const loadUserData = async () => {
    const response = await getPassengerId(id);
    setUser(response.data);
  }

  console.log('dd', user)

  return (
    <>
      <Box>
        {/* header */}
        <Header />
        {/* header */}

        <Box style={{ marginTop: '100px' }}>
          <CssBaseline />
          <Container fixed>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <div>
                  <p className="flightTitle"><span>Passenger Details</span></p>
                </div>
                <TableContainer component={Paper}>
                  <Animate type="fade" delay={0.5}>
                    <Table aria-label="customized table">
                      <TableBody>
                        <TableRow>
                          <StyledTableCell component="th">
                            <b>First Name</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.first_name}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <b>Last Name</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.last_name}
                          </StyledTableCell>
                        </TableRow>
                       
                        <TableRow>
                          <StyledTableCell component="th">
                            <b>Date Of Birth</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.date_of_birth}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <b>Gender</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.gender}
                          </StyledTableCell>
                        </TableRow>
                        
                        <TableRow>
                          <StyledTableCell component="th">
                            <b>Mobile No</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.mobile_no}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <b>Passport</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.passport}
                          </StyledTableCell>
                        </TableRow>
                       
                        <TableRow>
                          <StyledTableCell component="th">
                            <b>Seat No</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.seat_no}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <b>Infant</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.infant}
                          </StyledTableCell>
                        </TableRow>
                       
                        <TableRow>
                          <StyledTableCell component="th">
                            <b>Ancillary</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.ancillary}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <b>Special Meals</b>
                          </StyledTableCell>
                          <StyledTableCell>
                           {user.special_meals}
                          </StyledTableCell>
                        </TableRow>
                      
                        <TableRow>
                          <StyledTableCell component="th">
                            <b>Status</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.status}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <b>Wheel Chair</b>
                          </StyledTableCell>
                          <StyledTableCell>
                            {user.wheelChair}
                          </StyledTableCell>
                        </TableRow>
                       
                      </TableBody>
                    </Table>
                  </Animate>
                </TableContainer>
                <br/>
              </Grid>
             
            </Grid>
          </Container>
        </Box>

      </Box>
    </>
  );
};

export default PassengerDetails;