import "../css/style.css";
import AuthContext from "../context/auth-context";
// import BooksContext from "../context/books-context";
import { useState, useEffect, useContext } from "react";
import Layout from "../components/layout/Layout";
function MyApp({ Component, pageProps, router }) {
  let storagedToken;
  let storagedUserId;
  let storagedProfileURL;
  let storagedUsername;
  if (typeof window !== "undefined") {
    storagedToken = localStorage.getItem("token");
    storagedUserId = localStorage.getItem("userId");
    storagedProfileURL = localStorage.getItem("profileURL");
    storagedUsername = localStorage.getItem("username");
  }

  const [token, setToken] = useState(null || storagedToken);
  const [username, setUsername] = useState(null || storagedUsername);
  const [profile, setProfile] = useState(null || storagedProfileURL);
  const [userId, setUserID] = useState(null || storagedUserId);
  const login = (token, userId, username, profileURL) => {
    localStorage.setItem("userId", token);
    localStorage.setItem("profileURL", profileURL);
    localStorage.setItem("username", username);
    localStorage.setItem("token", userId);
    setToken(localStorage.getItem("token"));
    setUserID(localStorage.getItem("userId"));
    setProfile(localStorage.getItem("profileURL"));
    setUsername(localStorage.getItem("username"));
  };
  // const putBooks = (books) => {
  //   setBooks(books);
  // };

  const logout = () => {
    setToken(null);
    setUserID(null);
    setProfile(null);
    setUsername(null);

    localStorage.clear();
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          token: token,
          userId: userId,
          login: login,
          logout: logout,
          username: username,
          profileURL: profile,
        }}
      >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
export default MyApp;
