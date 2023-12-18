import React, {useEffect, useState} from 'react'
import {Box, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import MaterialCard from "../cards/MaterialCard";
import SpeedDialComponent from "../components/SpeedDialComponent";
import ListMaterialCard from "../cards/ListMaterialCard";
import {eel} from "../App";

export default function MaterialPage({elements}) {
    const [material_cards, setMaterialCards] = useState([
        {type: "rawMaterial", brand: "", coast: null, compound: null},
    ])

    const [raw_materials, setRawMaterials] = useState()

    const [additives, setAdditives] = useState()

    useEffect(() => {
        const dataItems = JSON.parse(localStorage.getItem('materialsCompound'));

        if (!dataItems) {
            const values = [
                {type: "rawMaterial", brand: "", coast: null, compound: null},
            ]
            setMaterialCards(values)
            return
        }

        setMaterialCards(dataItems);
    }, [])

    useEffect(() => {
        eel.get_raw_materials()().then(JSON.parse).then(function (response) {
            setRawMaterials(response)
        })
    }, []);

    useEffect(() => {
        eel.get_additives()().then(JSON.parse).then(function (response) {
            setAdditives(response)
        })
    }, []);

    function addRawMaterialCard() {
        setMaterialCards([...material_cards, {type: "rawMaterial", brand: "", coast: null, compound: null}])
    }

    function addAdditiveCard() {
        setMaterialCards([...material_cards, {type: "additive", brand: "", coast: null, compound: null}])
    }

    function changeCards(card_index, new_data) {
        const new_cards = material_cards
        new_cards[card_index] = new_data
        setMaterialCards(new_cards)
        localStorage.setItem('materialsCompound', JSON.stringify(new_cards));
    }

    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "row", overflowX: "scroll"}}>
            <ListMaterialCard cards={material_cards} materials={raw_materials} additives={additives} elements={elements}
                              changeCard={changeCards}/>
            <div style={{heigh: "50vh"}}>
                <SpeedDialComponent addRawMaterialCard={addRawMaterialCard} addAdditiveCard={addAdditiveCard}/>
            </div>
        </div>
    );
}