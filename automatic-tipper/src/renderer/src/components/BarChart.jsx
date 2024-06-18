import React from 'react';
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

ChartJS.register(annotationPlugin);
const BarChart = ({data, labels}) => {

  const annotations = []

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== 0) {
      annotations.push({
        type: "line",
        mode: "horizontal",
        xMin: -1,
        xMax: i,
        yMin: data[i],
        yMax: data[i],
        borderColor: "#60a5fa",
        borderWidth: 1,
        label: {
          enabled: true,
          content: "Test"
        },
      })
    }
  }
  
  return (
    <Chart
    type='bar' 
    data={{
      // labels: ["z1", "z2", "z3"],
      labels: labels,
      datasets: [
        {
          id: 1,
          data: data,
          backgroundColor: "#60a5fa",
          borderColor: "#60a5fa",
          borderWidth: 4,
          fill: true,
          barThickness: "10"
        },
        {
          id: 1,
          data: Array(data.length).fill(1),
          backgroundColor: "#bee3fc",
          borderColor: "#bee3fc",
          borderWidth: 4,
          fill: true,
          barThickness: "10"
        },
      ],
    }}
    options={{
      scales: {
        x: {
          stacked: true,
          ticks: {
            font: {
              size: 14,
              weight: "bold"
            }
          },
          grid: {
            color: "transparent"
          },
        },
        y: {
          min: 0,
          max: 1,
          ticks: {
            display: true,
            autoSkip: false,
            stepSize: 0.01,
            callback: function(value, idx, values) {
              return (data.includes(value.toFixed(2).toString()) ? value : "")
            },
          },
          grid: {
            color: "transparent"
          },
        }
        },
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: "Rules"
          },
          annotation: {
            annotations: annotations
          }
        },
      }
    }
    />
  )
}

export default BarChart