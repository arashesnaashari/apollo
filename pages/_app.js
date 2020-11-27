import AuthContext from "../context/auth-context";
import { useState, useEffect, useContext } from "react";
function MyApp({ Component, pageProps }) {
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
