import AuthContext from "../context/auth-context";
import React, { useState, useEffect, useContext } from "react";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";



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

const Dashboared = () => {
  const context = useContext(AuthContext);
  const { data, error } = useSWR(
    `query{ user(_id:"${context.userId}"){   books { image } reader { time date book { image title } pages } } }`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  if (data) console.log(data);

  return (
    <>
      {!context.userId && <h1>Login please</h1>}
      <ul>
        <li>Home</li>
        <li>Shelf</li>
        <li>Chart</li>
        <li>Setting</li>
      </ul>
    </>
  );
};

export default Dashboared;
