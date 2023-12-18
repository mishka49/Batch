import React, {useEffect, useState} from "react"
import IntervalInput from "./IntervalInput";


export default function ListIntervalInput({elements, data, updateData}) {
    if (!data) {
        return null;
    }

    return (
        <div>
            {elements.map((element) => {
                    const title = element[0];
                    const elementData = data[title];
                    if (elementData) {
                        const min = elementData[0]
                        const max = elementData[1]

                        return (
                            <IntervalInput element={element} minValue={min}
                                           maxValue={max}
                                           updateData={updateData} key={title}/>
                        )
                    }

                }
            )}
        </div>
    );
}