import React from 'react'
import {PieChart} from "@mui/x-charts";
import BarLegendComponent from "./BarLegendComponent";
import {Typography} from "@mui/material";

export default function BarChartComponent({
                                              data,
                                              innerRadius = 30,
                                              outerRadius = 100,
                                              paddingAngle = 5,
                                              cornerRadius = 5,
                                              startAngle = -90,
                                              endAngle = 180,
                                              x = 0,
                                              y = 0
                                          }) {

    return (
        // <div style={{display: "flex", flexDirection: "column"}}>
        //     <div style={{display: "flex", justifyContent: "center", width: "100%", padding: "2%",}}>
        //         <Typography variant="h5" component="h2">
        //             {label}
        //         </Typography>
        //     </div>
        //     <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
        <PieChart
            series={[
                {
                    data: data,

                    innerRadius: innerRadius,
                    outerRadius: outerRadius,
                    paddingAngle: paddingAngle,
                    cornerRadius: cornerRadius,
                    startAngle: startAngle,
                    endAngle: endAngle,
                    cx: x + outerRadius,
                    cy: y + outerRadius,
                },
            ]}
            height={outerRadius * 2 + 10}
            legend={{
                hidden: true,
                // arcLabel: (item) => `${item.label} (${item.value})`
            }}
        />
        //     {/*    <div style={{display: "flex", flexDirection: "row", margin: outerRadius / 5}}>*/}
        //     {/*        <BarLegendComponent data={data} circle_radius={outerRadius / 5} font_size={outerRadius / 5}/>*/}
        //     {/*    </div>*/}
        //     {/*</div>*/}
        // {/*</div>*/}
    );
}