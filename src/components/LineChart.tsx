import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  dataset: Array<number>
  title: string
}

const LineChart = ({dataset, title}: ChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          filter: function (legendItem, data) {
            return false;
          },
        },
      },
      title: {
        display: true,
        text: title + "%",
        color: parseInt(title) < 0 ? "rgb(255, 99, 132)" : "#20c265"
      },
    },
  };

  const labels = dataset.map(item => "");

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: dataset,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 0,
        tension: 0.5,
        borderWidth: 1
      },
    ],
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
