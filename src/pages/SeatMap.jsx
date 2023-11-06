import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Typography, Box } from '@mui/material/';
import './Seat.css';

const Seatmap = (props) => {
    const numberOfrows = 26;
    const numCols = 6
    const gridCells = [];

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
    const [seat, setSeat] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState('');
    const [selectedPassenger, setSelectedPassenger] = useState(null);

    const handleOpen = (seatNumber) => {
        setSelectedSeat(seatNumber);
        let passenger = props.passengerMap.find((data) => data.seat_no === seatNumber);
        setSelectedPassenger(passenger || null);
        if(passenger){
            setOpenModal(true);
        }
    }
    const handleClose = () => {
        setOpenModal(false)
    }

    const noticeCls = [
        {
            circle: 'Booked Seat',
            color: '#FFA500'
        },
        {
            circle: 'Booked Seat with Special Meal',
            color: '#0000ff'
        },
        {
            circle: 'Empty Seat',
            color: '#008000'
        }];



    for (let row = 0; row < numberOfrows; row++) {
        const rowLabel = String.fromCharCode(65 + row)
        for (let col = 0; col < numCols; col++) {
            const cellKey = `cell-${row}-${col}`;
            let seatNo = `${rowLabel}${col + 1}`
            let colors;
            let checkSeat = seat.filter(user => user.seat_no === seatNo);
            colors = checkSeat.length > 0 ? (checkSeat[0]?.meals.length > 0 ? "#0000ff" : "#FFA500") : "#008000";
            let disabled = checkSeat.length > 0 ? "" : "disbled";
            let pointer = checkSeat.length > 0 ? "pointer" : "not-allowed";

            gridCells.push(
                <div className='cell' key={cellKey} style={{ background: colors, cursor: pointer }} onClick={() => handleOpen(`${rowLabel}${col + 1}`)} disabled={disabled}>
                    {`${rowLabel}${col + 1}`}
                </div>
            )
        }
    }

    useEffect(() => {
        setSeat(props.bookedSeat);
    }, [props.bookedSeat])


    return (
        <>
            <div>
                <ul className="colorIdentify">
                    {

                        noticeCls.map((data, i) => (
                            <li key={i}>
                                <div className="clsName" style={{ background: `${data.color}` }}></div> {data.circle}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="container planeDesign">
                {gridCells}
            </div>
            <div>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Seat Number: {selectedSeat}
                        </Typography>
                        {
                            selectedPassenger ?
                                <>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        {`${selectedPassenger.first_name} ${selectedPassenger.last_name} `}
                                    </Typography>

                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Wheelchair:{selectedPassenger.wheelChair === 'Yes' ? 'Yes' : 'No'}
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        Infant:{selectedPassenger.infant === 'Yes' ? 'Yes' : 'No'}
                                    </Typography>
                                </>
                                : (
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        No passenger details available for this seat.
                                    </Typography>
                                )
                        }
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default Seatmap;