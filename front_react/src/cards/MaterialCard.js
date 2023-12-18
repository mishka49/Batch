import * as React from 'react';
import {useEffect, useState} from 'react';
import ComboBoxComponent from "../components/ComboBoxComponent";
import InputBoxComponent from "../components/InputBoxComponent";
import BarChartComponent from "../components/BarChartComponent";
import AccordionComponent from "../components/AccordionComponent";
import {eel} from "../App";
import DiagramBoxComponent from "../components/DiagramBoxComponent";
import BarLegendComponent from "../components/BarLegendComponent";


export default function MaterialCard({elements, materials, card_data, changeCard}) {
    const [material, setMaterial] = useState(card_data.brand)
    const [last_material, setLastMaterial] = useState(card_data.brand)
    const [card_compound, setCompound] = useState(card_data.compound)

    const [coast, setCoast] = useState(card_data.coast)

    useEffect(() => {
        eel.get_material(card_data.type, material)().then(JSON.parse).then(function (response) {
            if (last_material === material) {
                return
            }

            if (response == null) {
                const empty_compound = {
                    Cr: "0",
                    Ni: "0",
                    Fe: "0",
                    C: "0",
                    Mg: "0",
                    Al: "0",
                    Si: "0",
                    Mn: "0",
                    Cu: "0",
                    Zn: "0",
                    As: "0",
                    Cd: "0",
                    Sb: "0",
                    Sn: "0",
                    Pb: "0",
                    Bi: "0",
                    V: "0",
                    Co: "0",
                    W: "0",
                    Mo: "0",
                    N: "0",
                    Ti: "0",
                    S: "0",
                    P: "0"
                }
                changeCard(card_data.index, {
                    type: card_data.type,
                    brand: material,
                    coast: coast,
                    compound: empty_compound
                })
                setCompound(empty_compound)
            }


            if (response != null && response.length !== 0) {
                const material_coast = response[0].coast;
                const compound_id = (response[0].compound);

                eel.get_compound(compound_id)().then(JSON.parse).then(function (response) {
                    setCompound(response[0])
                    setCoast(material_coast)
                    changeCard(card_data.index, {
                        type: card_data.type,
                        brand: material,
                        coast: material_coast,
                        compound: response[0]
                    })
                })
            }
        })
    }, [material])


    function changeMaterial(newMaterial) {
        const value = newMaterial

        changeCard(card_data.index, {type: card_data.type, brand: value, coast: coast, compound: card_compound})
        setMaterial(value)
    }

    function changeCoast(newCoast) {
        setCoast(newCoast)
        changeCard(card_data.index, {type: card_data.type, brand: material, coast: newCoast, compound: card_compound})
        setLastMaterial(material)
    }

    function changeCompound(element, value) {
        const new_compound = card_compound
        new_compound[element] = value

        changeCard(card_data.index, {type: card_data.type, brand: material, coast: coast, compound: new_compound})
        setCompound(new_compound)
        setLastMaterial(material)
    }


    const data = [
        {id: 0, value: 0.95, label: 'Cr', color: "#483D8B"},
        {id: 1, value: 0.27, label: 'Si', color: "#6A5ACD"},
        {id: 2, value: 0.65, label: 'Mn', color: "#4B0082"},
        {id: 3, value: 0.3, label: 'Cu', color: "#800080"},
        {id: 4, value: 0.3, label: 'Ni', color: "#9932CC"},
        {id: 6, value: 0.4, label: 'C', color: "#8A2BE2"},
    ]

    if (!materials) {
        return null
    }


    return (
        <div
            style={{
                width: "300px",
                height: "70vh",

                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",

                border: "1px solid lightgrey",
                borderRadius: "10px",
                padding: "10px",
                margin: "5px",
                backgroundColor: "White",

                boxShadow: "5px 5px 5px lightgrey"
            }}>

            <ComboBoxComponent label={"Материал"} options={materials.map((material) => material.brand)}
                               changeOption={changeMaterial} default_option={card_data.brand}/>
            <div style={{margin: "10px"}}>
                <InputBoxComponent label="Цена: " unit={"BYN"} value={coast} changeValue={changeCoast}/>
            </div>

            <div style={{width: "100%", margin: "10px 0px 10px 0px"}}>
                <DiagramBoxComponent
                    diagram_component={<BarChartComponent data={data} outerRadius={75} innerRadius={35} paddingAngle={0}
                                                          cornerRadius={0}
                                                          x={30}/>}
                    legend_component={<BarLegendComponent data={data} circle_radius={"30px"} font_size={"20px"}/>}
                />
            </div>

            <div style={{width: "100%"}}>
                <AccordionComponent elements={elements} compound={card_compound} changeCompound={changeCompound}
                                    label={"Состав"}/>
            </div>
        </div>
    );
}
