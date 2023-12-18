import React, {useState} from 'react';
import {Input, Space} from "antd";


function InputElement({title, value, changeCompound}) {
    const [local_value, setLocalValue] = useState(value)
    const [last_value, setLastValue] = useState(value)

    if (value !== local_value && local_value === last_value) {
        setLocalValue(value)
        setLastValue(value)
    }

    function changeHandleValue(event) {
        const new_value = event.target.value
        changeCompound(title, new_value)

        setLocalValue(new_value)
    }



    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <Space.Compact size="large" style={{
                width: "100%",
                margin: "5px",
                border: "1px solid grey",
                borderRadius: "5px",
                boxShadow: "0px 8px 15px rgba(0,0,0,0.22)"
            }}>
                <div style={{
                    width: "15%",
                    alignItems: "center",
                    padding: "10px"
                }}>{title}</div>
                <Input placeholder="0.00" value={local_value} style={{width: "100%",}} onChange={changeHandleValue}/>
            </Space.Compact>
        </div>

    );
}

export default InputElement;