import React from "react";
import styled from "styled-components";
import Chartjs from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function Chart({ data }) {
  const finaldata = {
    type: "bar",
    labels: ["혁신", "괴짜"],
    datasets: [
      {
        data: [data.true, data.false],
        backgroundColor: ["#49cfd7", "#71BF8B"],
        borderColor: ["#1E90FF", "#228B22"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <BarContainer>
      <Bar
        data={finaldata}
        options={{
          indexAxis: "y",
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              display: true,
              color: "black",
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { display: false },
            },
            y: { grid: { display: false } },
          },
        }}
      />
    </BarContainer>
  );
}

const BarContainer = styled.div`
  height: 7rem;
`;
