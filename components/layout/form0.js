import { set } from "mongoose";
import React, { Component } from "react";
import AuthContext from "../../context/auth-context";

class AuthPage extends Component {
  state = {
    isLogin: false,
    error: "",
  };
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.nameEl = React.createRef();
    this.phoneEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const name = this.nameEl.current.value;
    const phone = this.phoneEl.current.value;
    const password = this.passwordEl.current.value;
    console.log(name, phone, password);
    if (
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      this.setState({ error: "fill all" });
    }

    let requestBody = {
      query: `
          query {
            login(phone: ${phone}, password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `,
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
        mutation {
          signIn(userInput: {phone: "${phone}", password: "${password}",username: "${name}"}) {
            _id
            phone
          }
        }
      `,
      };
    }
    console.log(requestBody);

    // fetch("http://localhost:3000/graphql", {
    //   method: "POST",
    //   body: JSON.stringify(requestBody),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error("Failed!");
    //     }
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     if (resData.data.login.token) {
    //       this.context.login(
    //         resData.data.login.token,
    //         resData.data.login.userId,
    //         resData.data.login.tokenExpiration
    //       );
    //     }
    //   })
    //   .catch((err) => {
    //     this.setState({ error: "some thing went wrong" });
    //   });
  };

  render() {
    return (
      <div style={{ background: "gray" }}>
        <form className="auth-form" onSubmit={this.submitHandler}>
          {!this.state.isLogin ? (
            <div className="form-control">
              <label htmlFor="name">name</label>
              <input type="name" id="name" ref={this.nameEl} />
            </div>
          ) : null}

          <div className="form-control">
            <label htmlFor="phone">phone</label>
            <input type="number" id="phone" ref={this.phoneEl} />
          </div>
          {!this.state.isLogin ? (
            <div className="form-control">
              <label htmlFor="password">password</label>
              <input type="password" id="password" ref={this.passwordEl} />
            </div>
          ) : null}
          {this.state.error}
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.switchModeHandler}>
              Go to {this.state.isLogin ? "Signup" : "Login"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AuthPage;
