import React from 'react'
import InputElement from "../components/InputElement";
import MaterialCard from "./MaterialCard";

export default function ListMaterialCard({cards, materials, additives, elements, changeCard}) {
    if (!materials) {
        return null
    }

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            {cards.map((card, index) => card.type === "rawMaterial" ?
                <MaterialCard elements={elements} materials={materials}
                              card_data={{
                                  index: index,
                                  type: card.type,
                                  brand: card.brand,
                                  coast: card.coast,
                                  compound: card?.compound
                              }}
                              changeCard={changeCard}/> :
                <MaterialCard elements={elements} materials={additives}
                              card_data={{
                                  index: index,
                                  type: card.type,
                                  brand: card.brand,
                                  coast: card.coast,
                                  compound: card?.compound
                              }}
                              changeCard={changeCard}/>
            )}
        </div>
    );
}