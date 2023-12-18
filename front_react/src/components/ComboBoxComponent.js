import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useEffect} from "react";


export default function ComboBoxComponent({label, options, changeOption, default_option}) {
    const [value, setValue] = React.useState(default_option);
    const [inputValue, setInputValue] = React.useState('');

    useEffect(() => {
        console.log("ComboBox change value: ", value)
        changeOption(value)
    }, [value])

    useEffect(() => {
          console.log("ComboBox change inputValue: ", inputValue)
        changeOption(inputValue)
    }, [inputValue])


    return (
        <div style={{width: "100%"}}>
            <Autocomplete
                freeSolo
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={options}
                sx={{}}
                renderInput={(params) => <TextField {...params} label={label}/>}
            />
        </div>
    );
}