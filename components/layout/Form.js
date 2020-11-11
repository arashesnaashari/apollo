import React, { useState, useContext } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useApolloClient } from "react-apollo";

import { gql } from "apollo-boost";
import AuthContext from "../../context/auth-context";

const Sign_In = gql`
  mutation SignIn($username: String!, $phone: String!, $password: String!) {
    signIn(
      userInput: { username: $username, phone: $phone, password: $password }
    ) {
      username
    }
  }
`;
const Log_In = gql`
  query LogIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      token
      tokenExpire
    }
  }
`;
function Form() {
  const context = useContext(AuthContext);

  const [username, setUser] = React.useState("");
  const [isLogin, setisLogin] = React.useState(true);
  const [phone, setphone] = React.useState("");
  const [password, setPass] = React.useState("");
  const [signIn, { loading, error }] = useMutation(Sign_In);
  // const [login, { called, loading1, data }] = useLazyQuery(Log_In);
  const client = useApolloClient();
  const [results, setResults] = useState([]);
  async function handleSubmit(event) {
    event.preventDefault();

    if (isLogin == false) {
      signIn({ variables: { username, phone, password } });
      setisLogin(!isLogin);
    }
    if (isLogin == true) {
      // login({ variables: { username, password } })
      const { data } = await client.query({
        query: Log_In,
        variables: { password, username },
      });
      if (data.login.token) {
        context.login(
          data.login.token,
          data.login.userId,
          data.login.tokenExpire
        );
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setUser(event.target.value)}
          placeholder="user"
        />
        {!isLogin && (
          <input
            onChange={(event) => setphone(event.target.value)}
            placeholder="phone"
          />
        )}
        <input
          onChange={(event) => setPass(event.target.value)}
          placeholder="pass"
        />
        <button disabled={loading} type="submit">
          Submit
        </button>
        <button type="button" onClick={() => setisLogin(!isLogin)}>
          Go to {isLogin ? "Signup" : "Login"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default Form;
