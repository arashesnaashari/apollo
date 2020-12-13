import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import BaseUrl from "../../../url";
import BooksContext from "../../../context/books-context";

const Search = (props) => {
  const context = useContext(BooksContext);
  const [data, setData] = useState(context.books);
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
