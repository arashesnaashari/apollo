import React, { useState, useEffect, useContext } from "react";
import BooksContext from "../../../context/books-context";

const Search = (props) => {
  const context = useContext(BooksContext);
  const [Data, setData] = useState(context.books);
  const [html, setHtml] = useState();
  const inputEvent = (e) => {
    let complitedResul;

    if (e) {
      complitedResul = Data.filter((book) => {
        return (
          book.title.toLowerCase().trim().includes(e) ||
          book.author.toLowerCase().trim().includes(e)
        );
      });

      complitedResul = complitedResul.map((book) => (
        <a href={`/book/${book._id}`}>
          {book.title} | {book.author}
        </a>
      ));

      setHtml(complitedResul);
    } else {
      setHtml(null);
    }

    // showcomplitedResult(complitedResul);
  };

  return (
    <>
      {!Data && (
        <div className="search-box">
          <input placeholder="درحال بارگیری ...  " disabled id="search" />
          <a href="#">
            <svg className="icon icon-search">
              <use xlinkHref="img/symbol-defs.svg#icon-search"></use>
            </svg>
          </a>
        </div>
      )}{" "}
      {Data && (
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
