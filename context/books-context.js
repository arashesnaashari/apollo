import React from "react";

export default React.createContext({
  books: null,
  putBooks: (books) => {},
});
