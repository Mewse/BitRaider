import React from 'react';
import "./Drive.css";

const Drive = (props) => {
    return (
        <div className="drive">
            <table>
                <tbody>
                    {Array(props.size).fill().map((item, index) => {
                        const data = props.data[index] === undefined ? "-" : props.data[index];
                        return (  
                            <tr key={index} className="drive-item">
                                <td className="drive-index">0x{index}</td>
                                <td className="drive-data">{data}</td>
                            </tr>
                        )
                    })}  
                </tbody>
            </table>
        </div>
    )
}

export default Drive;