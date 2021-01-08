import { useRouter } from "next/router";
import AuthContext from "../../context/auth-context";
import InfoContext from "../../context/user-dashB-nav";
import React, { useState, useEffect, useContext } from "react";
import useSWR from "swr";
import LayOut from "../../components/DashBoared/LayOut";

import Compare from "../../components/DashBoared/Index/compare";
import LastBook from "../../components/DashBoared/Index/lastBook";
import Perfomence from "../../components/DashBoared/Index/performance";
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

function Index() {
  const router = useRouter();
  const contextInfo = useContext(InfoContext);
  const context = useContext(AuthContext);
  let Data;
  if (context.userId) {
    const { data, error } = useSWR(
      `query{ user(_id:"${context.userId}"){reader { time date book { image title } pages } username  profileURL} }`,
      fetcher
    );
    if (error) return <div>Failed to load</div>;
    if (data) {
      Data = data;
      contextInfo.info.username = Data.user.username;
      contextInfo.info.profileURL = Data.user.profileURL;
    }
  }

  return (
    <>
      <LayOut>
        {!Data && <h1>Loading</h1>}

        <>
          {/* <Compare  /> */}
          {/* <LastBook />
          <Perfomence /> */}
        </>
      </LayOut>
    </>
  );
}

export default Index;
