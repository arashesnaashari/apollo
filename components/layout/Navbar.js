import Link from "next/link";
import Form from "./Form";
import { useState } from "react";
import AuthContext from "../../context/auth-context";
import Search from "./Search/Search";
const Navbar = () => {
  const [Modal, SetModal] = useState(false);
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <header className="main-header">
            <div className="user-box">
              {/* <a href="#">
                <span className="select-language">fa</span>
              </a>
              <a href="#" className="cart">
                0
              </a>
              <a href="">
                <svg className="icon icon-heart">
                  <use xlinkHref="img/symbol-defs.svg#icon-heart"></use>
                </svg>
              </a> */}
              {!context.token && (
                <a href="#">
                  <svg
                    className="icon icon-user-plus"
                    onClick={() => SetModal(!Modal)}
                  >
                    <use xlinkHref="img/symbol-defs.svg#icon-user-plus"></use>
                  </svg>
                </a>
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
              <Search />
            </div>
            <Link href="/">
              <a href="#" className="logo">
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
                    <use xlinkHref="img/symbol-defs.svg#icon-keyboard_arrow_down"></use>
                  </svg>
                </a>
              </div>

              {context.token && (
                <Link href="/dashboared">
                  <a href="/dashboared">داشبورد</a>
                </Link>
              )}
              {context.token && (
                <Link href="/dashboared">
                  <a href="/dashboared">کتابخانه من</a>
                </Link>
              )}
              {!context.token && Modal && <Form />}
            </nav>

            <div id="light-box" className="light-box">
              <a href="#" className="light-box--close"></a>
              <div className="light-box--container">
                <h1 className="light-box--title">دسته بندی</h1>
                <div className="light-box--images">
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Poetry.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      شعر{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Women and Feminism.png"
                        alt=""
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      زنان و فمنیسم{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Life style.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      سبک زندگی
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Religion and mysticism.png"
                        alt=""
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      دین و عرفان{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Psychology.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      روانشناسی{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Stories and novels.png"
                        alt="stories"
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      داستان و رمان{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Teenager.png"
                        alt="Teenager"
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      نوجوانان{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Child.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      کودک
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Rights.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      حقوق{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Economy.png" alt="Economy" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      اقتصاد{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Philosophy.png"
                        alt="Philosophy"
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      فلسفه{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/History.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      تاریخ{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Free Persian books.png"
                        alt="FreeBooks"
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      کتابهای رایگان فارسی
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Magazines.png "
                        alt="magazines"
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      مجلات{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/University.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      دانشگاهی{" "}
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Course.png" alt="" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      درسی و کمک درسی
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img
                        src="./img/img-gallery/Encyclopedia of the Islamic World.png"
                        alt=""
                      />
                    </a>
                    <a href="#" className="light-box--images__text">
                      دانشنامه جهان اسلام
                    </a>
                  </div>
                  <div className="light-box--image">
                    <a href="#">
                      <img src="./img/img-gallery/Art.png" alt="art" />
                    </a>
                    <a href="#" className="light-box--images__text">
                      {" "}
                      هنر{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navbar;
