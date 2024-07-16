import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ bestPerforming, title, color }) => {
  const fetchProducts = async () => {
    await axios
      .get("http://localhost:4000/api/sales/dashboard_products")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);



  if (bestPerforming.length == 0) {
  } else {
    var data = {
      labels: [bestPerforming && bestPerforming[0].tagname,
      bestPerforming && bestPerforming[1].tagname,],
      datasets: [
        {
          label: "Sales",
          data: [
            bestPerforming && bestPerforming[0].totalRevenue,
            bestPerforming && bestPerforming[1].totalRevenue,
          ],
          backgroundColor: color=="red"?"rgba(255, 0, 0, 0.6)":"rgba(75, 192, 192, 0.6)",
          borderColor: color=="red"?"rgba(255, 0, 0, 1)":"rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    var options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        title: {
          display: true,
          text: title, 
        },
      },
    };
    return <Bar data={data} options={options} />;
  }
};

export default BarChart;
