import React, { useEffect, useState } from "react";
import { Box, Button } from '@mui/material';
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
import Animate from "../../components/common/Animate";
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import './Dashboard.css';
import { FetchUserList } from "../../components/redux/action/Action";
import { connect } from "react-redux";
import { CSVLink} from "react-csv";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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


const PassengerAdmin = (props) => {
  const [checked, setChecked] = useState(true)
  //pagination
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  const [passenger, setPassenger] = useState([])


  function handleChangePage(event, newpage) {
    setpg(newpage);
  }
  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }
  
  const handleOpen = (e) => {
    const deleteUp = delete e.special_meals;
    return deleteUp
    //let updatespecialmeal = delete e.special_meals;
    
   
  }
 
 


  useEffect(() => {
    setChecked(checked)
    props.loaduser();
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await props.user.userlist;

      setPassenger(response);
  //    setPassengerList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const serviceList = [
    'Passport',
    'Address',
    'DOB'
  ]
  const handleClick = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      const filterData = passenger.filter((item) => value === 'Passport' ? item.passport === '' : value === 'Address' ? item.address === '' : value === 'DOB' ? item.date_of_birth === '' : item)
      setPassenger(filterData)
    } else {
      fetchData()
    }
  }

  return (
    <>
      <Box style={{ marginTop: '10px' }}>
        <CssBaseline />
        <div className="sticky_header">
          <Animate type="fade" delay={0.5}>
            {
              serviceList?.map((el) => (
                <label>
                  <Checkbox value={el} name='filter' onClick={handleClick} /> {el}
                </label>
              ))
            }


          </Animate>
         
        </div>


        <Container fixed>
          <>
            <TableContainer component={Paper}>
              <Animate type="fade" delay={0.5}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" className="passengerTable">
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
                      <StyledTableCell>
                      <CSVLink data={passenger} className="export">Export File</CSVLink>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {
                      passenger.slice(pg * rpg, pg * rpg + rpg)?.map((user) => (

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
                            {user.seat_no ? user.seat_no : 'NA'}
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
                            <div className="ellipse">
                              {
                                user.special_meals?.map((sm, i) => (
                                  <span key={i}>
                                    {(i ? ', ' : '') + sm}
                                  </span>
                                ))
                              }
                            </div>
                          </StyledTableCell>
                          <StyledTableCell>
                            <div className="ellipse">
                              {
                                user.ancillary?.map((data, i) => (
                                  <span key={i}>{(i ? ', ' : '') + data}</span>
                                ))
                              }
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Link to={`/dashboard/edit/${user.id}`} className="ViewFareBtn">Edit</Link>
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

const mapStateToProps=(state)=>{
  return{
    user:state.user
  }
}
const mapDispatchProps=(dispatch)=>{
  return{
    loaduser:()=> dispatch(FetchUserList())
  }
}

export default connect(mapStateToProps, mapDispatchProps) (PassengerAdmin);