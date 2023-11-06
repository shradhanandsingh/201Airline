import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import './EditPassenger.css';
import { Button, Input } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { getPassengerId, getPassengerSeat, updateList } from "../../../service/api";

const initialState = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    address: '',
    mobile_no: '',
    seat_no: '',
    passport: '',
    wheelChair: '',
    infant: '',
    status: '',
    gender: '',
    ancillary: [],
    special_meals: []
}




const EditPassenger = () => {
    const [user, setUser] = useState(initialState);
    const { first_name, last_name, date_of_birth, address, mobile_no, seat_no, passport, wheelChair, infant, status, gender, special_meals, ancillary } = user;
    const { id } = useParams();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [SeattAvailble, SetSeatAvailable] = useState([]);
    const [fetchBookedSeat, setFetchBookedSeat] = useState([]);
    const [bookSeat, setBookSeat] = useState([])
    const numberOfrows = 26;
    const numCols = 6;
    const seatList = [];

    const navigate = useNavigate();
    const Special_Meals = ["Veg-special", "Coffee", "North-Special", "Non-veg-meal", "Biryanis", "Alcohol", "Maggie", "Dessert"];
    const Ancillaries = ['vouchers', 'merchandise', 'Tv', 'BaggageAllowance', 'Movie', 'Student Discount'];
    useEffect(() => {
        loadingData();
        fetchingSeat();
        bookedSeatMapping();
    }, [id])

    const onValuechange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const loadingData = async () => {
        const res = await getPassengerId(id);
        setUser(res.data)
    }
    const fetchingSeat = async () => {
        for (let row = 0; row < numberOfrows; row++) {
            const rowLabel = String.fromCharCode(65 + row);
            for (let col = 0; col < numCols; col++) {
                let seatNo = `${rowLabel}${col + 1}`;
                seatList.push(seatNo);
                SetSeatAvailable(seatList);
            }
        }
    }
    const bookedSeatMapping = async() => {
        const result = await getPassengerSeat();
        setFetchBookedSeat(result.data);
        if (fetchBookedSeat.length > 0) {
            let bookedseat = [];
            fetchBookedSeat.forEach((data) => {
                if (data.seat_no !== "") {
                    bookedseat.push(
                        data.seat_no
                    )
                }
            })
            setBookSeat(bookedseat)
        }
    }
    const onSubmit = async () => {
        await updateList(id, user);
        navigate('/dashboard')
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <div className="card">
                    <div className="card-body">
                        <form className="edit_form_dashboard">
                            <Grid container spacing={2}>
                                <Grid xs={4}>
                                    <FormControl>
                                        <InputLabel>First Name</InputLabel>
                                        <Input onChange={(e) => onValuechange(e)}
                                            name="first_name" value={first_name} />
                                    </FormControl>

                                </Grid>
                                <Grid xs={4}>
                                    <FormControl>
                                        <InputLabel>Last Name</InputLabel>
                                        <Input onChange={(e) => onValuechange(e)}
                                            name="last_name" value={last_name} />
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl>
                                        <InputLabel>Date Of Birth</InputLabel>
                                        <Input onChange={(e) => onValuechange(e)}
                                            name="date_of_birth" value={date_of_birth} />

                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Gender"
                                            name="gender"
                                            value={gender}
                                            onChange={(e) => onValuechange(e)}
                                        >
                                            <MenuItem value="default">--Select--</MenuItem>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl>
                                        <InputLabel>Address</InputLabel>
                                        <Input onChange={(e) => onValuechange(e)}
                                            name="address" value={address} />
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl>
                                        <InputLabel>Phone Number</InputLabel>
                                        <Input onChange={(e) => onValuechange(e)}
                                            name="mobile_no" value={mobile_no} />
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Seat No</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Gender"
                                            name="seat_no"
                                            value={seat_no}
                                            onChange={(e) => onValuechange(e)}
                                        >
                                            <MenuItem value="default" disabled="true">--Select--</MenuItem>
                                            {
                                                SeattAvailble.map((data, i) => (
                                                    <MenuItem key={i} value={data}>{data}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl>
                                        <InputLabel>Passport</InputLabel>
                                        <Input onChange={(e) => onValuechange(e)}
                                            name="passport" value={passport} />
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Wheel Chair</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Wheel Chair"
                                            name="wheelChair"
                                            value={wheelChair}
                                            onChange={(e) => onValuechange(e)}
                                        >
                                            <MenuItem value="default">--select--</MenuItem>
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Infant</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Infant"
                                            name="infant"
                                            value={infant}
                                            onChange={(e) => onValuechange(e)}
                                        >
                                            <MenuItem value="default">--select--</MenuItem>
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Status"
                                            name="status"
                                            value={status}
                                            onChange={(e) => onValuechange(e)}
                                        >
                                            <MenuItem value="default">--select--</MenuItem>
                                            <MenuItem value="AC">AC</MenuItem>
                                            <MenuItem value="NC">NC</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-name-label">Special Meals</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            name="special_meals"
                                            multiple
                                            value={special_meals}
                                            onChange={(e) => onValuechange(e)}
                                            input={<OutlinedInput label="Special Meals" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Special_Meals.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                >
                                                    <Checkbox checked={special_meals.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-name-label">Special Meals</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            name="ancillary"
                                            multiple
                                            value={ancillary}
                                            onChange={(e) => onValuechange(e)}
                                            input={<OutlinedInput label="Special Meals" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {Ancillaries.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                >
                                                    <Checkbox checked={ancillary.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button variant="contained" className="saveform" endIcon={<SendIcon />} onClick={onSubmit}>Update</Button>
                        </form>
                    </div>
                </div>

            </Box>
        </>
    )
}

export default EditPassenger;