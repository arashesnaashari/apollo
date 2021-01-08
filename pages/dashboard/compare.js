import { Line } from "react-chartjs-2";
import LayOut from "../../components/DashBoared/LayOut";
import AuthContext from "../../context/auth-context";
import InfoContext from "../../context/user-dashB-nav";
import React, { useState, useEffect, useContext } from "react";
// import useSWR from "swr";
import dynamic from "next/dynamic";

const Chart = dynamic(
  () => {
    return import("react-apexcharts");
  },
  { ssr: false }
);

import queryGraphQl from "../../shared/query-graphql/index";

const Compare = ({ data }) => {
  const contextInfo = useContext(InfoContext);
  const context = useContext(AuthContext);
  const userInfo = data.users.find((u) => {
    return u._id == context.userId;
  });
  let userReaderPages = [];
  if (userInfo) {
    userInfo.reader.map((r) => {
      return userReaderPages.push(r.pages);
    });
  }
  console.log(userReaderPages);

  const [dataChart, setData] = useState("");
  const [options, setOpt] = useState("");
  const [series, setSeri] = useState("");
  let chart = () => {
    setOpt({
      chart: {
        height: 200,
        type: "line",
        zoom: {
          enabled: false,
        },
      },

      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Dec"],
      },
    });

    setSeri([
      {
        data: [3, 5, 6, 8],
        name: "XYZ MOTORS",
      },
      {
        data: [9, 4, 3, 1],
      },
    ]);
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    setSeri([
      {
        data: [3, 5, 6, 8],
        name: "XYZ MOTORS",
      },
      {
        data: [9, 4, 3, 1],
      },
      {
        data: [43, 5, 37, 1],
      },
    ]);
  };
  useEffect(() => {
    chart();
  }, []);

  return (
    <LayOut>
      {console.log(data.users)}
      <Chart options={options} series={series} type="line" width="40%" />
      <button onClick={handleUpdate}>Update</button>
    </LayOut>
  );
};
export async function getServerSideProps() {
  const dataQQ = await queryGraphQl(`
  query {
    users {
      _id
      username
      reader {
        pages
        date
        time
      }
    }
  }
  `);

  return {
    props: { data: dataQQ },
  };
}

export default Compare;
// https://github.com/bradtraversy/reactcharts/blob/master/src/components/Chart.js
// https://github.com/apexcharts/react-apexcharts#how-do-i-update-the-chart
// https://apexcharts.com/docs/update-charts-from-json-api-ajax/
// https://github.com/eipex2/nivo-nextjs/tree/master/pages
// https://pusher.com/tutorials/realtime-data-visualization-nextjs
