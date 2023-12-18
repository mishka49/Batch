import React from 'react'
import InputElement from './InputElement'
import IntervalInput from "./IntervalInput";


function ListInputElement({elements, compound, changeCompound}) {
    if (compound == null) {
        return null
    }

    console.log("list input compound", compound)
    console.log("list input elements", elements)

    return (
        <div>
            {elements.map((element) =>
                <InputElement title={element[0]}
                              value={parseFloat(compound[element[0]])}
                              changeCompound={changeCompound} key={element.title}/>
            )}
        </div>
    )
}

export default ListInputElement