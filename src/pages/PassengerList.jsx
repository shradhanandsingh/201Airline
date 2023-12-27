import React, { useEffect, useState } from "react";
import { Box } from '@mui/material';
import "./flight.css";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Paper from '@mui/material/Paper';
import "./Table.css";
import Animate from "../components/common/Animate";
import { Link } from 'react-router-dom';
//import { getPassengerList } from "../service/api";
import axios from "axios";





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


const PassengerList = ({flightId, serviceName, setSeatMap, getMeals, setPassengerList}) => {
  const [checked, setChecked] = useState(true)
  
//pagination
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  function handleChangePage(event, newpage) {
    setpg(newpage);
}

function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
}
//pagination
  const [passenger, setPassenger] = useState([])
  const [bookSeat, setBookSeat] = useState([])
  const [meals, setMeals] = useState([])

  const fetchData = async () => {
    const url = 'http://localhost:3000/passengerList'
    try {
      const response = await axios.get(`${url}?flight_id=${flightId}${serviceName.length > 0 ? serviceName.map((s) => `&${s}=${checked ? 'Yes' : 'No'}`).join('') : ''}`);

      setPassenger(response.data);
      setPassengerList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const bookedSeatMapping = ()=>{
    if(passenger.length > 0){
      let bookedseat = [];
      passenger.forEach((data)=> {
        if(data.seat_no  !== ""){
          bookedseat.push(
            {seat_no:data.seat_no, meals: data.special_meals}
            )
        }
      })
      setBookSeat(bookedseat)
      setSeatMap(bookedseat)
    }
  }
  const getSpecialMeal = ()=>{
    if(passenger.length > 0){
      let specialMeals = [];
      passenger.forEach((data)=> {
        if(data.special_meals !== ""){
          specialMeals.push(data.special_meals)
        }
      })
      setMeals(specialMeals)
      getMeals(specialMeals)
    }
  }
  useEffect(() => {
    setChecked(checked)
    fetchData()
    bookedSeatMapping()
    getSpecialMeal()
  }, [flightId, meals])

  console.log('bookSeat',bookSeat)
  return (
    <>
        <Box style={{ marginTop: '10px' }}>
          <CssBaseline />
          <Container fixed>
            <>
              <TableContainer component={Paper}>
                <Animate type="fade" delay={0.5}>
                  <Table className="passengerTable" sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                        <StyledTableCell>Mobile number</StyledTableCell>
                        <StyledTableCell>Gender</StyledTableCell>
                        <StyledTableCell>Infant</StyledTableCell>
                        <StyledTableCell>Wheel Chair</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Seat number</StyledTableCell>
                        <StyledTableCell>DOB</StyledTableCell>
                        <StyledTableCell>Passport</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>Special meal</StyledTableCell>
                        <StyledTableCell>Ancillary</StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {
                        passenger.slice(pg * rpg, pg * rpg + rpg).map((user) => (

                          <StyledTableRow key={user.id}>
                            <StyledTableCell component="th">
                              {user.first_name}
                            </StyledTableCell>
                            <StyledTableCell>
                               {user.last_name}
                            </StyledTableCell>
                            <StyledTableCell>
                              {user.mobile_no}
                            </StyledTableCell>
                            <StyledTableCell>
                             {user.gender}
                            </StyledTableCell>
                            <StyledTableCell>
                             {user.infant}
                            </StyledTableCell>
                            <StyledTableCell>
                            {user.wheelChair}
                            </StyledTableCell>
                            <StyledTableCell>
                            {user.status}
                            </StyledTableCell>
                            <StyledTableCell>
                            {user.seat_no ? user.seat_no: 'NA'}
                            </StyledTableCell>
                            <StyledTableCell>
                            {user.date_of_birth}
                            </StyledTableCell>
                            <StyledTableCell>
                            {user.passport ? user.passport : 'NA'}
                            </StyledTableCell>
                            <StyledTableCell>
                            {user.address}
                            </StyledTableCell>
                            <StyledTableCell>
                            {
                                user.special_meals?.map((sm, i) => (
                                  <span key={i}>
                                    {(i ? ', ' : '') + sm}
                                  </span>
                                ))
                              }
                            </StyledTableCell>
                            <StyledTableCell>
                            {
                                user.ancillary?.map((sm, i) => (
                                  <span key={i}>
                                    {(i ? ', ' : '') + sm}
                                  </span>
                                ))
                              }
                            </StyledTableCell>
                            <StyledTableCell align="right">
                            <Link to={`/passenger_list/${user.id}`} className="ViewFareBtn">View Details</Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      }

                    </TableBody>

                  </Table>
                </Animate>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={passenger.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </>
          </Container>
        </Box>
    </>
  );
};

export default PassengerList;