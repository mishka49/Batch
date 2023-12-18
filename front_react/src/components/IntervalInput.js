import React, {useEffect, useState} from "react"
import {Input, Space} from "antd";


export default function
    ({element, minValue, maxValue, updateData}) {
    const [min, setMinValue] = useState(minValue)
    const [max, setMaxValue] = useState(maxValue)

    function changeHandleMinValue(event) {
        const value = event.target.value
        setMinValue(value);
        updateData(element[0], value, max);
    }

    function changeHandleMaxValue(event) {
        const value = event.target.value
        setMaxValue(value)
        updateData(element[0], min, value)
    }

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <Space.Compact size="large" style={{
                width: "100%",
                margin: "5px",
                border: "1px solid grey",
                borderRadius: "5px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
            }}>
                <div style={{
                    width: "10%",
                    alignItems: "center",
                    padding: "10px"
                }}>{element[0]}</div>
                <Input placeholder="0.00" value={min} onChange={changeHandleMinValue}
                       style={{width: "45%",}}/>
                <Input placeholder="0.00" value={max} onChange={changeHandleMaxValue}

                       style={{width: "45%",}}/>
            </Space.Compact>
        </div>


    );
}