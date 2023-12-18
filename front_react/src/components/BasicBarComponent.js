import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Column} from '@ant-design/plots';

export default function BasicBarComponent({data}) {
    const paletteSemanticRed = '#F4664A';
    const brandColor = 'rgba(0,21,41,255)';
    const config = {
        data,
        xField: 'label',
        yField: 'value',
        seriesField: '',
        color: ({type}) => {
            if (type === '10-30分' || type === '30+分') {
                return paletteSemanticRed;
            }

            return brandColor;
        },
        label: {
            content: (originData) => {
                const val = parseFloat(originData.value);

                if (val < 0.05) {
                    return (val * 100).toFixed(1) + '%';
                }
            },
            offset: 10,
        },
        legend: false,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    };
    return <Column {...config} />;
};
