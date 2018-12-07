import React from 'react';
import "./Drive.css";

const Drive = (props) => {
    return (
        <div className="drive">
            <table>
                <tbody>
                    {Array(props.size).fill().map((item, index) => {
                        let data = props.data[index] === undefined ? "-" : props.data[index];
                        let isParityData = data.startsWith("p_");
                        if (isParityData) data = data.split('_')[1];
                        return (  
                            <tr key={index} className="drive-item">
                                <td className="drive-index">0x{index.toString(16)}</td>
                                <td className={`drive-data ${isParityData ? "parity": ""}`}>{data}</td>
                            </tr>
                        )
                    })}  
                </tbody>
            </table>
        </div>
    )
}

export default Drive;