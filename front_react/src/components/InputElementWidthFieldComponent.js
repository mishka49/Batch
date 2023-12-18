import React, {useState} from 'react';
import {Input, Space} from "antd";

export default function InputElementWidthFieldComponent({title, value, changeCompound, labelWidth}) {
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
                    minWidth: labelWidth,
                    alignItems: "center",
                    padding: "10px"
                }}>{title}</div>
                <Input placeholder="0.00" style={{width: "100%",}} value={local_value} onChange={changeHandleValue}/>
            </Space.Compact>
        </div>

    );
}
