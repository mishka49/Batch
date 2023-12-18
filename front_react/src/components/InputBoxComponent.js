import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import {MenuItem} from "@mui/material";


const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
    {
        value: 'BYN',
        label: 'р.',
    },
    {
        value: 'кг',
        label: 'кг',
    }
];

export default function InputBoxComponent({label, unit, value, changeValue}) {
    const [localValue, setLocalValue] = useState(value)
    const [lastValue, setLastValue] = useState(value)

    if (value !== localValue && localValue === lastValue) {
        setLocalValue(value)
        setLastValue(value)
    }

    function changeHandleValue(event) {
        const newValue = event.target.value

        changeValue(newValue)
        setLocalValue(newValue)
    }

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <h3>{label} </h3>
            <TextField id="standard-basic" value={localValue} variant="standard"
                       onChange={changeHandleValue} style={{width: "70%"}}/>
        </div>
    )
}