import Link from "next/link";
import Form from "./Form";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import Search from "./Search/Search";
const Navbar = (props) => {
  const context = useContext(AuthContext);
  const [Modal, SetModal] = useState(false);
  return (
    <header className="main-header">
      <div className="user-box">
        <a href="#">
          <span className="select-language">fa</span>
        </a>
        {!context.token && (
          <a href="#" className="cart">
          0
        </a>
        )}
        {context.token && (
          <a href="/dashboard">
            <img src={context.profileURL} width="40"></img>
          </a>
        )}
        <a href="">
          <svg className="icon icon-heart">
            <use xlinkHref="/img/symbol-defs.svg#icon-heart"></use>
          </svg>
        </a>
        {!context.token && (
          <svg className="icon icon-user-plus" onClick={() => SetModal(!Modal)}>
            <use xlinkHref="/img/symbol-defs.svg#icon-user-plus"></use>
          </svg>
        )}
        {context.token && (
          <Link href="#">
            <button type="button" onClick={context.logout}>
              LogOut
            </button>
          </Link>
        )}
      </div>

      <div className="serach-box">
        <Search data={props.search} />
      </div>
      <Link href="/">
        <a href="/" className="logo">
          <h1>BookGram.io</h1>
        </a>
      </Link>
      <nav className="nav-bar">
        <Link href="/">
          <a>خانه</a>
        </Link>
        <Link href="/blog">
          <a>بلاگ</a>
        </Link>

        <div className="fix-svg">
          <a href="./pages/category.html">دسته بندی</a>
          <a href="#light-box">
            <svg className="icon icon-keyboard_arrow_down">
              <use xlinkHref="/img/symbol-defs.svg#icon-keyboard_arrow_down"></use>
            </svg>
          </a>
        </div>

        {context.token && (
          <Link href="/dashboard">
            <a href="/dashboard">داشبورد</a>
          </Link>
        )}
        {context.token && (
          <Link href="/dashboard/library">
            <a href="/dashboard/library">کتابخانه من</a>
          </Link>
        )}
        {!context.token && Modal && <Form />}
      </nav>
    </header>
  );
};

export default Navbar;
