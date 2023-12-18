import React from 'react'
import {Typography} from "@mui/material";
import {PieChart} from "@mui/x-charts";
import BarLegendComponent from "./BarLegendComponent";


export default function DiagramBoxComponent({diagram_component, legend_component, label = ""}) {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", justifyContent: "center", width: "100%", padding: "2%",}}>
                <Typography variant="h5" component="h2">
                    {label}
                </Typography>
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                {diagram_component}
                <div style={{display: "flex", flexDirection: "row", margin: "5%"}}>
                    {legend_component}
                </div>
            </div>
        </div>
    );
}