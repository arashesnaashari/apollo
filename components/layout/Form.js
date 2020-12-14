import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import fetch from "isomorphic-unfetch";
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
      const body = {
        username: username,
        phone: phone,
        password: password,
      };
      try {
        fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.msg == "404") {
              console.log("40404");
              return;
            }
            setisLogin(!isLogin);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }
    if (isLogin == true) {
      const body = {
        username: username,
        password: password,
      };
      try {
        // const query = {
        //   query: `
        //     query {
        //       login(username:"${username}",password:"${password}"){
        //         token
        //         userId
        //         tokenExpire
        //       }
        //     }
        //   `,
        // };
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();

        if (data.data.login.token) {
          context.login(
            data.data.login.userId,
            data.data.login.token,
            data.data.login.tokenExpire
          );
        }
      } catch (error) {
        setErr("erroooor");
        console.log("error " + error);
      }
    }
  }

  return (
    <div className="sign-up">
      <div className="sign-up--container">
        <div className="form-group">
          <h3 className="logo">BookGram.io</h3>
          <h1 className="form-group--title">شروع کنیم</h1>
          <div className="login-link">
            {!isLogin ? (
              <>
                <span className="login-text">حساب کاربری دارید؟</span>
                <a onClick={() => setisLogin(!isLogin)}>ورود</a>
              </>
            ) : (
              <>
                <span className="login-text">حساب کاربری ندارید؟</span>
                <a onClick={() => setisLogin(!isLogin)}>ثبت نام</a>
              </>
            )}
          </div>
          {console.log(isLogin)}
          {!clozeModal && (
            <form onSubmit={handleSubmit}>
              <input
                onChange={(event) => setUser(event.target.value)}
                placeholder="نام"
                type="text"
              />
              {!isLogin && (
                <input
                  onChange={(event) => setphone(event.target.value)}
                  placeholder="شماره همراه"
                  type="text"
                />
              )}
              <input
                onChange={(event) => setPass(event.target.value)}
                placeholder="رمز عبور"
                type="password"
              />
              <button type="submit">ثبت</button>

              {err && <span>{err}</span>}
            </form>
          )}
        </div>

        <div className="sign-up--image">
          <img src="img/signup-image.png" alt="Trulli" />
          <div className="sign-up--image__caption">کتابخانه خودت را بساز</div>
        </div>
      </div>
    </div>
  );
}

export default Form;
