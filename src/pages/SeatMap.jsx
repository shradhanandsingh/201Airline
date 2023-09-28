import React, { useEffect, useState } from 'react';
import './Seat.css';

const Seatmap = (props) => {
    const numberOfrows = 26;
    const numCols = 6
    const gridCells = [];

    const [seat, setSeat]= useState([])


    for (let row = 0; row < numberOfrows; row++) {
        const rowLabel = String.fromCharCode(65 + row)
        for (let col = 0; col < numCols; col++) {
            const cellKey = `cell-${row}-${col}`;
            let seatNo =  `${rowLabel}${col + 1}`
            let colors;
            colors = seat.includes(seatNo.toString()) ? "#FFA500" : "#008000";
            let disabled = seat.includes(seatNo.toString()) ? "disbled" : "";
            let pointer = seat.includes(seatNo.toString()) ? "not-allowed" : "pointer";

            gridCells.push(
                <div className='cell' key={cellKey} style={{ background: colors, cursor: pointer }} disabled={disabled}>
                    {`${rowLabel}${col + 1}`}
                </div>
            )
        }
    }

    useEffect(()=> {
        setSeat(props.bookedSeat);
    },[props.bookedSeat])

  //  console.log('seat', seat)
    
    return (
       <>
         <div className="container planeDesign">
            {gridCells}
        </div>
       </>
    );
};

export default Seatmap;