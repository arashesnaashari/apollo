import SideTop from "./SideTop";
import SideRight from "./SideRight";
import AuthContext from "../../context/auth-context";
import { useContext } from "react";
import Form from "../layout/Form";

const Layout = (props) => {
  const context = useContext(AuthContext);
  return (
    <>
      {!context.token && <Form />}
      {context.token && (
        <>
          {/* Side Top */}
          <SideTop />
          {/* Side centr */}
          {props.children}
          {/* Side Right */}
          <SideRight />
        </>
      )}
    </>
  );
};

export default Layout;
