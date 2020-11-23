import React, { useState, useEffect } from "react";
import Link from "next/link";

const Search = () => {
  const [data, setData] = useState([]);
  const [html, setHtml] = useState();

  fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
  query {
    books {
             title
             author
             _id
         }
  }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => console.log(err));
  const inputEvent = (e) => {
    let complitedResul;

    if (e) {
      complitedResul = data.data.books.filter((book) => {
        return (
          book.title.toLowerCase().trim().includes(e) ||
          book.author.toLowerCase().trim().includes(e)
        );
      });

      complitedResul = complitedResul.map((book) => (
        <Link href={`book/${book._id}`}>
          <p>
            {book.title} | {book.author}
          </p>
        </Link>
      ));
    }

    console.log(complitedResul);
    // showcomplitedResult(complitedResul);
  };
  const showcomplitedResult = (complitedResul) => {
    setHtml(complitedResul);
  };

  return (
    <>
      <input
        placeholder="searching .... "
        onInput={(e) => inputEvent(e.target.value)}
      />
      {CountryListItem(html)}
    </>
  );
};
const CountryListItem = ({ title, author }) => {
  return (
    <li className="list-group-item d-flex">
      <div className="col pt-2">
        {title} <span className="badge badge-info">{author}</span>
      </div>
    </li>
  );
};

export default Search;
