import React from "react";
import styled from "styled-components";
import Chartjs from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export default function DonutChart({ data }) {
  const finaldata = {
    type: "doughnut",
    labels: ["외계인 글", "우주인 글", "중립글"],
    datasets: [
      {
        data: [data.alien, data.astronaut, data.common],
        backgroundColor: ["#71BF8B", "#49cfd7", "gray"],
        borderColor: ["#1E90FF", "#228B22", "gray"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <DoughnutContainer>
      <Doughnut
        data={finaldata}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                font: {
                  size: 16,
                },
              },
            },
            tooltip: {
              titleFont: {
                size: 20,
              },
              titleAlign: "center",

              footerFont: {
                size: 25,
              },
              footerAlign: "center",
              padding: 20,

              callbacks: {
                title: function (tooltipItem) {
                  return tooltipItem[0].label;
                },
                label: function (tooltipItem) {
                  return "";
                },
                footer: function (tooltipItem) {
                  return `${parseInt(
                    (tooltipItem[0].dataset.data[tooltipItem[0].dataIndex] /
                      tooltipItem[0].dataset.data.reduce(
                        (acc, cur) => acc + cur,
                        0
                      )) *
                      100
                  )} %`;
                },
              },
            },
          },
        }}
      />
    </DoughnutContainer>
  );
}

const DoughnutContainer = styled.div`
  padding: 3rem;
  margin: auto 0;
`;
