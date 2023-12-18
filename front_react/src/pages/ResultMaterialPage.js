import React, {useState, useEffect} from "react"
import BarChartComponent from "../components/BarChartComponent";
import ListInputElement from "../components/ListInputElement";
import ListIntervalInput from "../components/ListIntervalInput";
import DiagramBoxComponent from "../components/DiagramBoxComponent";
import BarLegendComponent from "../components/BarLegendComponent";


function ResultMaterialPage({elements}) {
    const dataM = [
        {id: 0, value: 0.95, label: 'Cr', color: "#483D8B"},
        {id: 1, value: 0.27, label: 'Si', color: "#6A5ACD"},
        {id: 2, value: 0.65, label: 'Mn', color: "#4B0082"},
        {id: 3, value: 0.3, label: 'Cu', color: "#800080"},
        {id: 4, value: 0.3, label: 'Ni', color: "#9932CC"},
        {id: 6, value: 0.4, label: 'C', color: "#8A2BE2"},
    ];

    const values = Object()
    const [data, setData] = useState(values)


    useEffect(() => {
        const dataItems = JSON.parse(localStorage.getItem('resultCompound'));
        if (!dataItems) {
            const values = Object()
            elements.map((element) => element[0]).forEach((element) => values[element] = [0, 0])
            setData(values)
        }

        if (dataItems != null) {
            setData(dataItems);
        }
    }, [])

    function updateData(element, minValue, maxValue) {
        data[element] = [minValue, maxValue]
        localStorage.setItem('resultCompound', JSON.stringify(data));
    }

    return (
        <div className="resultMaterialPage" style={{
            display: "flex",
            flexDirection: "row",
        }}>
            <div style={{width: "40%", margin: "10px"}}>
                <ListIntervalInput elements={elements} data={data} updateData={updateData}/>
            </div>
            <div style={{width: "60%", margin: "10px"}}>
                <DiagramBoxComponent
                    diagram_component={<BarChartComponent data={dataM} outerRadius={150} innerRadius={50} x={200}/>}
                    legend_component={<BarLegendComponent data={dataM} circle_radius={"30px"} font_size={"150%"}/>}
                />
            </div>
        </div>
    );
}

export default ResultMaterialPage