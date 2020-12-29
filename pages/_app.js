import "../css/style.css";
import AuthContext from "../context/auth-context";
import { useState, useEffect, useContext } from "react";
import BooksContext from "../context/books-context";
import fetch from "isomorphic-unfetch";

function MyApp({ Component, pageProps }) {
  const context = useContext(BooksContext);

  let storagedToken;
  let storagedUserId;

  if (typeof window !== "undefined") {
    storagedToken = localStorage.getItem("token");
    storagedUserId = localStorage.getItem("userId");
  }

  const [token, setToken] = useState(null || storagedToken);
  const [userId, setUserID] = useState(null || storagedUserId);
  const login = (token, userId, tokenExpiration) => {
    localStorage.setItem("userId", token);
    localStorage.setItem("token", userId);
    setToken(localStorage.getItem("token"));
    setUserID(localStorage.getItem("userId"));
  };

  const logout = () => {
    setToken(null);
    setUserID(null);
    localStorage.clear();
  };

  // fetch(`/api/graphql`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     query: `
  //     query {
  //       books {
  //                title
  //                _id
  //                author
  //            }
  //     }`,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     context.books = data.data.books;
  //   })
  //   .catch((err) => console.log(err));

  return (
    <>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
export default MyApp;
