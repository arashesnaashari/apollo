// import AuthContext from "../context/auth-context";
// import React, { useState, useEffect, useContext } from "react";
// import useSWR from "swr";
// import fetch from "isomorphic-unfetch";



// const fetcher = (query) =>
//   fetch("/api/graphql", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ query }),
//   })
//     .then((res) => res.json())
//     .then((json) => json.data);

// const Dashboared = () => {
//   const context = useContext(AuthContext);
//   const { data, error } = useSWR(
//     `query{ user(_id:"${context.userId}"){   books { image } reader { time date book { image title } pages } } }`,
//     fetcher
//   );

//   if (error) return <div>Failed to load</div>;
//   if (!data) return <div>Loading...</div>;
//   if (data) console.log(data);

//   return (
//     <>
//       {!context.userId && <h1>Login please</h1>}
//       <ul>
//         <li>Home</li>
//         <li>Shelf</li>
//         <li>Chart</li>
//         <li>Setting</li>
//       </ul>
//     </>
//   );
// };

// export default Dashboared;
// import AuthContext from "../../../context/auth-context";
import { useState, useContext } from "react";

export default function Upload() {
  const context = useContext(AuthContext);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [username, setUser] = useState("");
  const [phone, setphone] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      console.log(phone, username, context.userId);
      await fetch("/api/graphql", {
        method: "POST",
        body: JSON.stringify({
          query: `
            mutation {
              update(input:{userId:"${context.userId}",username:"${username}",phone:"${phone}",profile:"${base64EncodedImage}"}){
                _id
                profileURL
              }
            }
            `,
        }),
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };
  return (
    <div>
      <h1 className="title">Upload an Image</h1>
      <form onSubmit={handleSubmitFile} className="form">
        <input
          onChange={(event) => setUser(event.target.value)}
          placeholder="نام کاربری"
          type="text"
        />
        <input
          onChange={(event) => setphone(event.target.value)}
          placeholder="شماره همراه"
          type="text"
        />
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
}
