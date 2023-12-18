import React, {useState} from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListInputElement from "./ListInputElement";

export default function AccordionComponent({elements, compound, label, changeCompound}) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                // aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {label}
            </AccordionSummary>
            <AccordionDetails style={{boxShadow: "5px 5px 10px lightgrey"}}>
                <ListInputElement elements={elements} compound={compound} changeCompound={changeCompound}
                                  style={{width: "100%", padding: "5px"}}/>
            </AccordionDetails>
        </Accordion>
    );
}