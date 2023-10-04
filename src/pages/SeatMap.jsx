import React, { useEffect, useState } from 'react';
import './Seat.css';

const Seatmap = (props) => {
    const numberOfrows = 26;
    const numCols = 6
    const gridCells = [];

    const [seat, setSeat]= useState([]);
    const noticeCls = [
        {
           circle: 'Booked Seat',
           color: '#FFA500'
        },
        {
            circle:'Booked Seat with Special Meal',
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
            let seatNo =  `${rowLabel}${col + 1}`
            let colors;
            let checkSeat = seat.filter(user => user.seat_no === seatNo);
            colors = checkSeat.length > 0 ? (checkSeat[0]?.meals.length > 0 ? "#0000ff": "#FFA500") : "#008000";
            let disabled = checkSeat.length > 0 ? "" : "disbled";
            let pointer = checkSeat.length > 0 ? "pointer":"not-allowed";

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


    return (
       <>
        <div>
              <ul className="colorIdentify">
                {
                   
                    noticeCls.map((data,i)=> (
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
       </>
    );
};

export default Seatmap;