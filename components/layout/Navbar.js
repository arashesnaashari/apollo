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
          <nav>
            <div>
              <Search />
              <Link href="/">
                <a>Home</a>
              </Link>
              {!context.token && (
                <button type="button" onClick={() => SetModal(!Modal)}>
                  Login
                </button>
              )}

              {context.token && (
                <Link href="#">
                  <button type="button" onClick={context.logout}>
                    LogOut
                  </button>
                </Link>
              )}

              {context.token && (
                <Link href="/dashboared">
                  <a href="/dashboared">dashboared</a>
                </Link>
              )}
              {!context.token && Modal && <Form />}
            </div>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navbar;
