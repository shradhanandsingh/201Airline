import React, {useState, useEffect} from "react";
import { Box } from '@mui/material';
import Header from "../components/common/Header";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import "./flight.css";
import {
  Select, MenuItem, FormControl, InputLabel, Grid, ListItemText, Checkbox, OutlinedInput
} from "@mui/material";
import moment from 'moment'
import { getFlightList } from "../service/api";
import PassengerList from "./PassengerList";
import Seatmap from "./SeatMap";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const servicenames = [
  'wheelChair',
  'infant'
];

const FlightList = () => {

const [flightDetails, setFightDetails] = useState([]);
const [flightId, setFlightId] = useState("");
const [serviceName, setServiceName] = useState([]);
const [seatMapping, setSeatMapping]= useState([])

const flightDetailsList = async()=> {
  try {
    const response = await getFlightList();
    setFightDetails(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

useEffect(()=> {
  flightDetailsList()
}, [])

const handleChangeEvent = (event) => {
  console.log(event.target.value)

  setFlightId(event.target.value)

};

const handleChange =(event)=>{
  const {target: { value }} = event;

  setServiceName(
    typeof value === 'string' ? value.split(',') : value,
  )
}


  return (
    <>
      <Box>
        {/* header */}
        <Header />
        {/* header */}

        <Box style={{ marginTop: '100px' }}>
          <CssBaseline />
          <Container fixed>
            <div>
              <p className="flightTitle"><span>Flights List</span></p>
            </div>
            <Grid
                style={{padding: "12px" }}
                container
                direction="column"
                justify="space-between"
            >
                <Grid xs={8} item><FormControl variant="outlined" margin={"normal"}>
                    <InputLabel id="test-select-label" style={{ top: '2.2em' }}>Flight Details</InputLabel>
                    <Select
                        sx={{ marginTop: 5, width: 250, height: 50 }}
                        onChange={handleChangeEvent}
                        label='Flight Details'
                        variant='outlined'
                        value={flightId}
                    >
                        {flightDetails && flightDetails.map((row, i) => {


                            console.log(row);
                            return (
                                <MenuItem key={row.flight_id} value={row.flight_id}>
                                    {`${row.flightNo} ${row.fromPlace} - ${row.toPlace}
                                ${moment(row.departureDate).format("ddd MMM Do YYYY h:mm a")} 
                                ${moment(row.arrivalDate).format("ddd MMM Do YYYY h:mm a")}`
                                    }


                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                  {
                    flightId && 
                    <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={serviceName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {servicenames.map((row) => (
                                <MenuItem key={row} value={row}>
                                    <Checkbox checked={serviceName.indexOf(row) > -1} />
                                    <ListItemText primary={row} />
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl>
                  }
                
                </Grid>
            </Grid>


            <Grid container spacing={2}>
              <Grid xs={10}>
              {
              flightId ?  <PassengerList flightId={flightId} serviceName={serviceName} setSeatMap={setSeatMapping} />: 'Data Not Found'
            }
              </Grid>
              <Grid xs={2}>
                {flightId && <Seatmap bookedSeat={seatMapping} /> }
                
              </Grid>
            </Grid>
          </Container>
        </Box>

      </Box>
    </>
  );
};

export default FlightList;