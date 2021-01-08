import InfoContext from "../../context/user-dashB-nav";
import { useContext } from "react";
const Setting = () => {
  const context = useContext(InfoContext);
  return (
    <>
      <h1>NABAR</h1>
      {context.info.username}
      <img src={context.info.profileURL}></img>
    </>
  );
};
export default Setting;
