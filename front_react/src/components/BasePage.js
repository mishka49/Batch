import React, {useEffect} from 'react';
import ListInputElement from './ListInputElement';
import {useState} from 'react';
import {eel} from "../App";

import {Box, Button as Btn, CssBaseline, IconButton, styled, ThemeProvider, Toolbar, Typography} from "@mui/material"
import ComboBoxComponent from "./ComboBoxComponent";
import MaterialCard from "../cards/MaterialCard";
import SpeedDialComponent from "./SpeedDialComponent";
import MaterialPage from "../pages/MaterialPage";
import ResultMaterialPage from "../pages/ResultMaterialPage";
import ResultPage from "../pages/ResultPage";
import ListIntervalInput from "./ListIntervalInput";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import StovePage from "../pages/StovePage";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";

const {Header, Sider, Content} = Layout;


const BasePage = () => {
    const navigate = useNavigate()
    const [elements, setElements] = useState([
        // {title: 'Cr', value: 0.00},
        // {title: 'Fe', value: 0.00},
        // {title: 'Mg', value: 0.00},
        // {title: 'Mo', value: 0.00}
    ])

    const [results, setResults] = useState()

    const [defaultSelectedKeys, setdefaultSelectedKeys] = useState(['1'])


    // useEffect(() => {
    //     eel.get_calculated(fullData)().then(JSON.parse).then(function (response) {
    //         console.log("Ура, JSON!", response);
    //         setResults(response)
    //     })
    // }, [fullData])


    useEffect(() => {
        // eel.get_elements()().then(JSON.parse).then(function (response) {
        //     console.log("Ура, JSON!", response);
        //     setElements(Object.entries(response))
        // })
        setElements(Object.entries({
            "Cr": "exact",
            "Ni": "exact",
            "Fe": "exact",
            "C": "exact",
            "Mg": "exact",
            "Al": "exact",
            "Si": "exact",
            "Mn": "exact",
            "Cu": "exact",
            "Zn": "exact",
            "As": "exact",
            "Cd": "exact",
            "Sb": "exact",
            "Sn": "exact",
            "Pb": "exact",
            "Bi": "exact",
            "V": "exact",
            "Co": "exact",
            "W": "exact",
            "Mo": "exact",
            "N": "exact",
            "Ti": "exact",
            "S": "not_exact",
            "P": "not_exact"
        }))
    }, [])

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();


    function readAllData() {
        const result_compound = JSON.parse(localStorage.getItem('resultCompound'));
        const materials = JSON.parse(localStorage.getItem('materialsCompound'));
        const stove_compound = JSON.parse(localStorage.getItem('stoveCompound'));

        return {
            result_compound: result_compound,
            materials: materials,
            stove_compound: stove_compound,
            elements: elements.map((element)=>element[0])
        }
    }

    function isValidData(data) {
        return true
    }

    function getCalculated(fullData) {
        eel.get_calculated(fullData)().then(JSON.parse).then(function (response) {
            console.log("Results", response);
            setResults(response)
        })
    }


    function Calculate(){
        const fullData = readAllData()

        if (isValidData(fullData)){
            getCalculated(fullData)
            openResultPage()
        }
    }

    function clearLocalStorage(){
        localStorage.clear()
    }

    function openResultPage() {
        const data = readAllData()
        console.log("Readed data: ", data)
        setdefaultSelectedKeys(['4'])
        navigate("/4")
    }


    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={defaultSelectedKeys}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: 'Конечный состав',
                            onClick: (e) => navigate("/1")
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined/>,
                            label: 'Исходные материалы',
                            onClick: (e) => navigate("/2")
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined/>,
                            label: 'Печь',
                            onClick: (e) => navigate("/3")
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined/>,
                            label: 'Результат',
                            onClick: (e) => navigate("/4")
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{display: "flex", justifyContent: "right", alignItems: "center"}}>
                        <Btn variant="contained" href="#contained-buttons" onClick={Calculate}
                             style={{margin: "10px"}}>
                            Рассчитать
                        </Btn>
                         <Btn variant="contained" href="#contained-buttons" onClick={clearLocalStorage}
                             style={{margin: "10px"}}>
                            Очистить
                        </Btn>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: 10,
                    }}
                >

                    <Routes>
                        <Route path="/1"
                               element={<ResultMaterialPage elements={elements}/>}/>
                        <Route path="/2"
                               element={<MaterialPage elements={elements}/>}/>
                        <Route path="/3"
                               element={<StovePage elements={elements}/>}/>
                        <Route path="/4"
                               element={<ResultPage results={results}/>}/>
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );

}

export default BasePage;