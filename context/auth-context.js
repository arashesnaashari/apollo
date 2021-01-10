import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  profileURL: null,
  username: null,
  login: (token, userId, username, profileURL) => {},
  logout: () => {},
});
