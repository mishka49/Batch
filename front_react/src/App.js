import {useEffect, useState} from "react";
import BasePage from "./components/BasePage";
import "./styles/App.css";
import MaterialPage from "./pages/MaterialPage";
import ResultMaterialPage from "./pages/ResultMaterialPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


export const eel = window["eel"];


function App() {
    const [elements, setElements] = useState([
        {title: 'Cr', value: 0.00},
        {title: 'Fe', value: 0.00},
        {title: 'Mg', value: 0.00},
        {title: 'Mo', value: 0.00}
    ])
    // const [elements, setElements] = useState()
    //
    // useEffect(() => {
    //     eel.get_elements()().then(JSON.parse).then(function (response) {
    //             console.log("Ура, JSON!", response);
    //             setElements(Object.keys(response))
    //         })
    // }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <BasePage/>
            </BrowserRouter>
        </div>
    );
}

export default App;
