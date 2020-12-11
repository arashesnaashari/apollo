import React, { useState, useEffect } from "react";
import Link from "next/link";
import BaseUrl from "../../../url";

const Search = (props) => {
  const [data, setData] = useState(props.data);
  const [html, setHtml] = useState();
  const inputEvent = (e) => {
    let complitedResul;

    if (e) {
      complitedResul = data.filter((book) => {
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
          <input placeholder="جستوجو کنید ...  " disabled id="search" />
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
            placeholder="جستوجو کنید ...  "
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
