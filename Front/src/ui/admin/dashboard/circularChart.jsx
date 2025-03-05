
import React, { useState, useEffect, useContext } from 'react';
import { Chart } from 'primereact/chart';

export default function StatusChart( {labels, info}) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    // const response = await $Auth.login(values.email, values.password);

    useEffect(() => {
      
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: labels,
            datasets: [
                {
                    data: info,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-600'),
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--purple-500'), 
                        documentStyle.getPropertyValue('--green-400'), 
                        documentStyle.getPropertyValue('--pink-300'), 
                        documentStyle.getPropertyValue('--red-600'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--blue-300'), 
                        documentStyle.getPropertyValue('--purple-400'), 
                        documentStyle.getPropertyValue('--green-300'), 
                        documentStyle.getPropertyValue('--pink-200'), 
                        documentStyle.getPropertyValue('--red-500'), 
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
                

    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}