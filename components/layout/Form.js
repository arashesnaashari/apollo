import { use } from "passport";
import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";

function Form() {
  const context = useContext(AuthContext);

  const [username, setUser] = React.useState("");
  const [isLogin, setisLogin] = React.useState(true);
  const [clozeModal, setClozeModal] = React.useState(false);
  const [phone, setphone] = React.useState("");
  const [password, setPass] = React.useState("");
  const [err, setErr] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setErr(null);
    if (isLogin == false) {
      //signUp
      try {
        const res = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `mutation {
              signIn(input:{username:"${username}",password:"${password}",phone:"${phone}"}){
               username,
                phone
              }
            }`,
          }),
        });
        const data11 = await res.json();
        setisLogin(!isLogin);
        console.log(data11);
        return data11;
      } catch (error) {
        alert(error);
      }
    }
    if (isLogin == true) {
      try {
        const res = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query {
              login(username:"${username}",password:"${password}"){
                userId,
                token,
                tokenExpire

              }
            }`,
          }),
        });
        const data11 = await res.json();
        console.log(data11.data.login.tokenExpire);

        if (data11.data.login.token) {
          context.login(
            data11.data.login.userId,
            data11.data.login.token,
            data11.data.login.tokenExpire
          );
        }
        
        return data11;
      } catch (error) {
        setErr('erroooor');
      }
    }
  }
  console.log(context);

  return (
    <div>
      {!clozeModal && (
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => setUser(event.target.value)}
            placeholder="user"
            type="text"
          />
          {!isLogin && (
            <input
              onChange={() => setphone(event.target.value)}
              placeholder="phone"
              type="text"
            />
          )}
          <input
            onChange={(event) => setPass(event.target.value)}
            placeholder="pass"
            type="password"
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setisLogin(!isLogin)}>
            Go to {isLogin ? "Signup" : "Login"}
          </button>{" "}
          {err && <span>{err}</span>}
        </form>
      )}
    </div>
  );
}

export default Form;
