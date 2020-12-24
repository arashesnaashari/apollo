import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

const Compare = () => {
  const [data, setData] = useState("");
  const chart = () => {
    setData({
      labels: ["1", "2", "3", "4", "5"], //x
      datasets: [
        {
          fill: false,
          label: "1",
          data: [2, 4, 3], //y => data =>
          backgroundColor: ["red"],
          borderWidth: 4,
        },
        {
          fill: false,
          label: "1",
          data: [4, 2, 1], //y => time =>
          backgroundColor: ["red"],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <section style={{ height: "500px" }} className="dufiowgu">
      <Line
        data={data}
        options={{
          responsive: true,
          title: { text: "SSSS", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </section>
  );
};

export default Compare;
