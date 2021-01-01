import LayOut from "../../components/DashBoared/LayOut";
// import Form from "../../components/DashBoared/setting/index";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import Form from "../../components/layout/Form";
const Setting = () => {
  const context = useContext(AuthContext);
  const [username, setusername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const resInfo = await fetch("/api/graphql", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     query: `
    //   mutation {
    //     update(input:{userId:"${context.userId}",username:"${username}",phone:"${phone}",password:"${password}"}){
    //       _id
    //      }
    //       }
    //   `,
    //   }),
    // });
    // const dataInfo = await resInfo.json();

    const formData = new FormData();
    formData.append("profilePicture", file);
    const resFile = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const dataFile = await resFile.json();
    console.log(dataFile);
    console.log(username, phone, password, file);
  };
  return (
    <>
      <LayOut>
        {/* <Form /> */}
        <form onSubmit={handleSubmit}>
          <input
            type="username"
            name="username"
            placeholder="username"
            onChange={(e) => setusername(e.target.value)}
          ></input>
          <input
            type="text"
            name="phone"
            placeholder="phone"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="file"
            name="file"
            placeholder="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
          <button>Submit</button>
        </form>
      </LayOut>
    </>
  );
};
export default Setting;
