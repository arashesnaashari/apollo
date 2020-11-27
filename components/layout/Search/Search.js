import React, { useState, useEffect } from "react";
import Link from "next/link";

const Search = () => {
  const [data, setData] = useState(null);
  const [html, setHtml] = useState();

  fetch("http://localhost:3000/api/graphql", {
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
    .then((data) => {
      setData(data);
    })
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
        <Link href={`/book/${book._id}`}>
          <p>
            {book.title} | {book.author}
          </p>
        </Link>
      ));

      setHtml(complitedResul);
    } else {
      setHtml(null);
    }

    // showcomplitedResult(complitedResul);
  };

  return (
    <>
      {!data && (
        <div className="search-box">
          <input placeholder="searching .... " disabled id="search" />
          <a href="#">
            <svg className="icon icon-search">
              <use xlinkHref="img/symbol-defs.svg#icon-search"></use>
            </svg>
          </a>
        </div>
      )}{" "}
      {data && (
        <div className="search-box">
          <input
            placeholder="searching .... "
            onInput={(e) => inputEvent(e.target.value)}
            id="search"
          />
          <a href="#">
            <svg className="icon icon-search">
              <use xlinkHref="img/symbol-defs.svg#icon-search"></use>
            </svg>
          </a>
        </div>
      )}
      {html}
    </>
  );
};

export default Search;
