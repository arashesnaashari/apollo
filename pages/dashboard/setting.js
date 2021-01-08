import LayOut from "../../components/DashBoared/LayOut";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import useSWR from "swr";
import InfoContext from "../../context/user-dashB-nav";
import { useRouter } from "next/router";

const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

const Setting = () => {
  const router = useRouter();
  const contextInfo = useContext(InfoContext);
  const context = useContext(AuthContext);
  const [username, setusername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [file, setFile] = useState(null);

  let Data;
  if (context.userId) {
    const { data, error } = useSWR(
      `query { user(_id:"${context.userId}"){ username  profileURL phone} }`,
      fetcher
    );
    if (error) return <div>Failed to load</div>;
    if (data) {
      Data = data;
      contextInfo.info.username = Data.user.username;
      contextInfo.info.profileURL = Data.user.profileURL;
    }
  }
  console.log(Data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username !== null && phone !== null && password !== null) {
      const resInfo = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
        mutation {
          update(input:{userId:"${context.userId}",username:"${username}",phone:"${phone}",password:"${password}"})
            }
        `,
        }),
      });
      const dataInfo = await resInfo.json();
      console.log(dataInfo);
    } else {
      console.log("erroorror fill al thgem");
    }
  };
  const handleChangeFile = async (e) => {
    e.preventDefault();
    if (username !== null && phone !== null && password !== null) {
      const dataInfo = await resInfo.json();
      const formData = new FormData();
      formData.append("profilePicture", e.target.files[0]);
      formData.append("userId", context.userId);
      const resFile = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const dataFile = await resFile.json();
      console.log(dataFile);
    } else {
      console.log("erroorror fill al thgem");
    }
  };
  return (
    <>
      <LayOut>
        {/* <Form /> */}
        {Data && (
          <form onSubmit={handleSubmit}>
            <input
              type="username"
              name="username"
              value={Data.user.username}
              placeholder="username"
              onChange={(e) => setusername(e.target.value)}
            ></input>
            <input
              type="text"
              name="phone"
              value={Data.user.phone}
              placeholder="phone"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input type="file" name="file" onChange={handleChangeFile}></input>
            <button>Submit</button>
          </form>
        )}
      </LayOut>
    </>
  );
};
export default Setting;
