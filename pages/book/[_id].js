import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

export default function Id(props) {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  const [comments, setComments] = useState(props.data.data.book.comments);

  const router = useRouter();
  const { _id } = router.query;
  const NumericRate = parseInt(rate);
  async function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
        createComment(input:{text:"${text}",rate:${NumericRate},book:"${_id}"}){
          text
          _id
          date
          creator {
            username
          }
        }
      }`,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(props.data.data.book));
  }

  return (
    <>
      {props.data.data.book.comments.map((e) => {
        return <div key={e._id}>{e.text}</div>;
      })}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="text .. "
          type="text"
          required
          onChange={(event) => setText(event.target.value)}
        />
        <input
          placeholder="rate"
          type="number"
          min="1"
          max="5"
          required
          onChange={(event) => setRate(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
  query {
    book(_id:"${params._id}") {
      title,
      image,
      group,
      author,
      publication
      price
      comments{
        text
        _id
        date
        creator{
          username
        }
      }
    }
  }`,
    }),
  });
  const data11 = await res.json();

  return {
    props: { data: data11 },
  };
}
