import React, {useRef, useEffect} from 'react';
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

ChartJS.register(annotationPlugin);
// ChartJS.defaults.color = "#c2c2c2";
// ChartJS.defaults.font.family = "Courier New"; 
// ChartJS.defaults.font.size = "14px"; 
// ChartJS.defaults.elements.line.borderWidth = 2;

const LineChart = ({mfs, mfsLabels, rating, title}) => {

  const labels = Array.from({length: 11}, (_, i) => i*0.5);
  const colors = ["#991b1b", "#f59e0b", "#059669"];

    const datasets = {
    labels: labels,
    datasets: Array.from({length: mfs.length}, (_, i) => {
      return {
        label: mfsLabels[i],
        data: Array.from({length: 11}, (_, d) => mfs[i].calculate(d*0.5)),  
        fill: false,
        backgroundColor: colors[i],
        borderColor: colors[i],
      }
    }
  )};

  const chartRef = useRef();

  return (
    <Chart
    ref={chartRef}
    type='line' 
    data={datasets}
    options={{
      radius: 0,
      scales: {
        x: {
          min: 0,
          ticks: {
          },
        },
        y: {
          min: 0,
          max: 1,
          ticks: {
            stepSize: .1
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: "left",
          maxWidth: "150",
        },
        title: {
          display: true,
          text: title
        },
        annotation: {
          annotations: [
            {
              type: "line",
              // mode: "vertical",
              xMin: parseInt(rating * 2),
              xMax: parseInt(rating * 2),
              yMin: 0,
              yMax: 1,
              // borderColor: "white",
              borderColor: "#f43f5e",
              borderWidth: 3,
              borderDash: [5, 5],
            }
          ]
        }
      },
    }}
    />
  )
}

export default LineChart