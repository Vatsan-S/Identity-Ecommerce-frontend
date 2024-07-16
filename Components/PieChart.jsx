import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.totalRevenue),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };
  var options = {
   
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      title: {
        display: true,
        text: "Overall Sales % by category", 
      },
    },
  };
  return <Pie data={chartData} options={options}/>
};

export default PieChart;