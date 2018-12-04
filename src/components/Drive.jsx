import React from 'react';
import "./Drive.css";

const Drive = (props) => {
    return (
        <div className="drive">
            <ul>
                {props.data.map(item => <li className="drive-item">{item}</li>)}
            </ul>
        </div>
    )
}

export default Drive;