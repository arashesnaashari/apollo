import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import BooksContext from "../../../context/books-context";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const Search = (props) => {
  const context = useContext(BooksContext);
  const [Data, setData] = useState(context.books);
  // async function AAA() {
  //   const res = await fetch(`/api/graphql`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  // query {
  //   books {
  //     title
  //     _id
  //     author
  //        }
  // }`,
  //     }),
  //   });
  //   const data11 = await res.json();
  // }
  // if (!Data) {
  //   fetch(`/api/graphql`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //       query {
  //         books {
  //                  title
  //                  _id
  //                  author
  //              }
  //       }`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       context.books = data.data.books;
  //       setData(context.books);
  //     })
  //     .catch((err) => console.log(err));
  // }

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
        <a onClick={() => router.push(`/book/${book._id}`)}>
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
