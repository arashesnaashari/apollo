import App from "next/app";
import { ApolloProvider } from "react-apollo";
import ApolloClient, { from } from "apollo-boost";
import AuthContext from "../context/auth-context";

class myApp extends App {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    const { Component, pageProps } = this.props;
    const client = new ApolloClient({
      uri: "http://localhost:3000/graphql",
    });
    return (
      <AuthContext.Provider
        value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout,
        }}
      >
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthContext.Provider>
    );
  }
}
export default myApp;
