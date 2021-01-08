import LayOut from "../../../components/DashBoared/LayOut";
import AuthContext from "../../../context/auth-context";
import InfoContext from "../../../context/user-dashB-nav";
import React, { useState, useEffect, useContext } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
// import queryGraphQl from "../../shared/query-graphql/index";

const Chart = dynamic(
  () => {
    return import("react-apexcharts");
  },
  { ssr: false }
);
const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

const Compare = () => {
  const contextInfo = useContext(InfoContext);
  const context = useContext(AuthContext);
  let Data;
  if (context.userId) {
    const { data, error } = useSWR(
      `query { user(_id:"${context.userId}"){ username  profileURL reader { pages date time }} }`,
      fetcher
    );
    if (error) return <div>Failed to load</div>;
    if (data) {
      Data = data;
      contextInfo.info.username = Data.user.username;
      contextInfo.info.profileURL = Data.user.profileURL;
    }
  }
  const [options, setOpt] = useState("");
  const [series, setSeri] = useState("");
  let chart = (e) => {
    setOpt({
      chart: {
        height: 200,
        type: "line",
        zoom: {
          enabled: false,
        },
      },

      xaxis: {
        type: "category",
      },
    });

    setSeri(e);
  };

  useEffect(() => {
    let ddddd = [];
    if (Data) {
      ddddd.push({
        x: Data.user.reader.map((e) => e.time),
        y: Data.user.reader.map((e) => e.date),
      });
    }
    console.log("w", ddddd);
    chart(ddddd);
  }, []);
  console.log(Data);
  return (
    <>
      <LayOut>
        {Data && (
          <Chart options={options} series={series} type="line" width="100%" />
        )}
      </LayOut>
    </>
  );
};
export default Compare;
// export async function getStaticProps(context) {
//   const dataQQ = await queryGraphQl(`
//   query {
//     users {
//       _id
//       username
//       reader {
//         pages
//         date
//         time
//       }
//     }
//   }
//   `);

//   return {
//     props: { data: dataQQ },
//   };
// }
//Data.user.reader.map((e) => e.time)
// <LayOut>
//   <section style={{ height: "500px" }} className="dufiowgu">
//     <Line
//       data={dataChart}
//       options={{
//         responsive: true,
//         title: { text: "SSSS", display: false },
//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 autoSkip: true,
//                 maxTicksLimit: 10,
//                 beginAtZero: false,
//               },
//               gridLines: {
//                 display: false,
//               },
//             },
//           ],
//           xAxes: [
//             {
//               gridLines: {
//                 display: false,
//               },
//             },
//           ],
//         },
//       }}
//     />
//     <button onClick={handleUpdate}>Update</button>
//   </section>
// </LayOut>
// const chart = () => {
//   setData({
//     labels: ["2"], //x
//     datasets: [
//       {
//         fill: false,
//         label: "1",
//         data: ["4"], //y => data =>
//         backgroundColor: ["red"],
//         borderWidth: 4,
//       },
//     ],
//   });
// };
