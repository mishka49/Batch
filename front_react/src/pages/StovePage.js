import React, {useEffect, useState} from "react"
import ComboBoxComponent from "../components/ComboBoxComponent";
import {eel} from "../App";
import AccordionComponent from "../components/AccordionComponent";
import BasicBarComponent from "../components/BasicBarComponent";
import ListInputElement from "../components/ListInputElement";
import DiagramBoxComponent from "../components/DiagramBoxComponent";

export default function StovePage({elements}) {
    const [stoves, setStoves] = useState([{}])
    const [compound, setCompound] = useState()

     useEffect(() => {
        const dataItems = JSON.parse(localStorage.getItem('stoveCompound'));
        if (!dataItems) {
            const values = null
            setCompound(values)
        }

        if (dataItems != null) {
            setCompound(dataItems);
        }
    }, [])

    useEffect(() => {
        eel.get_stoves()().then(JSON.parse).then(function (response) {
            console.log("Stoves: ", response);
            setStoves(response)
        })
    }, [])

    function changeOption(new_stove_type) {
        console.log("Set new stove type:", new_stove_type)

        eel.get_stove(new_stove_type)().then(JSON.parse).then(function (response) {
            console.log("Current Stove: ", response);

            if (response != null && response.length !== 0) {
                console.log("stove_waste: ", response[0].waste_elem);

                const compound_id = response[0].waste_elem;

                eel.get_compound(compound_id)().then(JSON.parse).then(function (response) {
                    console.log("Compound: ", response);
                    setCompound(response[0]);
                    localStorage.setItem('stoveCompound', JSON.stringify(response[0]))
                })
            }
        })
    }

    function changeCompound(element, value) {
        console.log("Page Compound: ", compound)
        console.log("Page change")
        console.log(element, value)
        const new_compound = compound
        new_compound[element] = value
        setCompound(new_compound)
        localStorage.setItem('stoveCompound', JSON.stringify(new_compound));
    }

    const data = [
        {id: 0, value: 0.95, label: 'Cr', color: "#483D8B"},
        {id: 1, value: 0.27, label: 'Si', color: "#6A5ACD"},
        {id: 2, value: 0.65, label: 'Mn', color: "#4B0082"},
        {id: 3, value: 0.3, label: 'Cu', color: "#800080"},
        {id: 4, value: 0.3, label: 'Ni', color: "#9932CC"},
        {id: 6, value: 0.4, label: 'C', color: "#8A2BE2"},
    ]


    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{display: "flex", flexDirection: "column", width: "30%"}}>
                <div style={{margin: "10px"}}><ComboBoxComponent label={"Тип"} changeOption={changeOption}
                                                                 options={stoves.map((stove) => stove.type)}/>
                </div>
                <div style={{margin: "10px"}}>
                    <ListInputElement elements={elements} compound={compound} changeCompound={changeCompound}/>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", width: "70%", height: "40vh", margin: "10px"}}>
                <DiagramBoxComponent diagram_component={<BasicBarComponent data={data}/>}
                                     legend_component={""}
                                     label={"Угар элементов"}
                />
            </div>
        </div>
    );
}