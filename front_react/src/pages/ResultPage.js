import React, {useState} from "react"
import BarChartComponent from "../components/BarChartComponent";
import BasicBarComponent from "../components/BasicBarComponent";
import DiagramBoxComponent from "../components/DiagramBoxComponent";
import BarLegendComponent from "../components/BarLegendComponent";
import InputBoxComponent from "../components/InputBoxComponent";
import ListInputElement from "../components/ListInputElement";
import InputElement from "../components/InputElement";
import InputElementWidthFieldComponent from "../components/InputElementWidthFieldComponent";


export default function ResultPage({results}) {
    const [batchCompound, setbatchCompound] = useState(results)

    if (batchCompound == null && results != null) {
        setbatchCompound(results)
    }

    const [totalWeight, setTotalWeight] = useState(0)


    const data = [
        {id: 0, value: 0.95, label: 'Cr', color: "#483D8B"},
        {id: 1, value: 0.27, label: 'Si', color: "#6A5ACD"},
        {id: 2, value: 0.65, label: 'Mn', color: "#4B0082"},
        {id: 3, value: 0.3, label: 'Cu', color: "#800080"},
        {id: 4, value: 0.3, label: 'Ni', color: "#9932CC"},
        {id: 6, value: 0.4, label: 'C', color: "#8A2BE2"},
    ]

    const result_data = [
        {id: 3, value: 0.3, label: 'FeMn75C80VHP', color: "#800080"},
        {id: 4, value: 0.3, label: 'ФС50', color: "#9932CC"},
        {id: 6, value: 0.4, label: 'Сталь45', color: "#8A2BE2"},
    ]

    function changeTotalWeight(newValue) {
        setTotalWeight(newValue)
    }

    function getSignificantItems(items) {
        const significant_items = []
        for (let i = 0; i < items.length; i++) {
            if (items[i][1] === 0) {
                continue
            }

            significant_items.push(items[i])
        }

        return significant_items
    }

    const material = [
        {brand: "FeMn75C80VHP"},
        {brand: "ФС50"},
        {brand: "Сталь 45"}
    ]


    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{width: "50%", display: "flex", flexDirection: "column"}}>
                <div style={{width: "70%", margin: "10px"}}>
                    <InputBoxComponent label={"Масса конечного состава"} unit={"кг"} changeValue={changeTotalWeight}/>
                </div>
                <div style={{width: "50%", display: "flex", flexDirection: "column"}}>
                    {batchCompound?.map((item) => <InputElementWidthFieldComponent title={item[0]}
                                                                                   value={item[1] * totalWeight}
                                                                                   labelWidth={"50%"}/>)}
                </div>
            </div>


            <div style={{width: "50%", display: "flex", flexDirection: "column"}}>
                <div style={{
                    margin: "5%",
                    padding: "1%",
                    borderRadius: "15px",
                    boxShadow: "0px 8px 15px rgba(0,0,0,0.22)"
                }}>
                    <DiagramBoxComponent
                        diagram_component={<BarChartComponent data={data}
                                                              outerRadius={145}
                                                              innerRadius={75}
                                                              paddingAngle={0}
                                                              cornerRadius={0}/>}
                        legend_component={<BarLegendComponent data={data} circle_radius={"30px"} font_size={"150%"}/>}
                        label={"Искомый состав"}
                    />
                </div>
                <div style={{
                    margin: "5%",
                    padding: "2%",

                    borderRadius: "15px",
                    boxShadow: "0px 8px 15px rgba(0,0,0,0.22)"
                }}>
                    <DiagramBoxComponent
                        diagram_component={<BarChartComponent data={result_data}
                                                              outerRadius={150}
                                                              innerRadius={75}
                                                              paddingAngle={0}
                                                              cornerRadius={0}/>}
                        legend_component={<BarLegendComponent data={result_data} circle_radius={"30px"}
                                                              font_size={"150%"}/>}
                        label={"Состав шихты"}
                    />
                </div>
            </div>
        </div>
    );
}