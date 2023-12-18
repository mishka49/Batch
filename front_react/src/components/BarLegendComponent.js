import React from 'react'


export default function BarLegendComponent({data, circle_radius, font_size}) {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            {data.map((item) => <div
                    style={{display: "flex", flexDirection: "row", justifyContent: "center", margin: "5%", width: "45%"}}>
                    <div style={{
                        minWidth: circle_radius,
                        minHeight: circle_radius,
                        backgroundColor: item.color,
                        borderRadius: "50%"
                    }}></div>
                    <div style={{fontSize: font_size, width: "55%", margin: "5%"}}>{item.label}</div>
                </div>
            )}
        </div>
    )
}