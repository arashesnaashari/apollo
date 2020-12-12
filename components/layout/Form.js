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
      const body = {
        username: username,
        phone: phone,
        password: password,
      };
      try {
        console.log("client" + JSON.stringify(body));
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        setisLogin(!isLogin);
        console.log(data);
      } catch (error) {
        alert(error);
      }
    }
    if (isLogin == true) {
      const body = {
        username: username,
        phone: phone,
        password: password,
      };
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();

        console.log(data.msg);
        if (data.msg.token) {
          context.login(data.msg.userId, data.msg.token, data.msg.tokenExpire);
        }
      } catch (error) {
        setErr("erroooor");
        console.log(error);
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
