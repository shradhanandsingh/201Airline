import axios from 'axios';

const url = "http://localhost:3000/";

export const getFlightList = async (id) => {
    id = id || '';
    return await axios.get(`${url + 'flightList'}/${id}`);
}

export const getPassengerList = async (id)=> {
    return await axios.get(`${url}passengerList?flight_id=${id}`);
}

export const getPassengerSeat = async ()=> {
    return await axios.get(`${url}passengerList`);
}

export const getPassengerId = async (id)=> {
    return await axios.get(`${url + 'passengerList'}/${id}`);
    
}