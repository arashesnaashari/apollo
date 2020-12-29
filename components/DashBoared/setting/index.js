// import { useState, useContext } from "react";
// import AuthContext from "../../../context/auth-context";

// const Index = () => {
//   const context = useContext(AuthContext);
//   const [username, setUser] = useState("");
//   const [phone, setphone] = useState("");
//   const [image, setImage] = useState("");
//   async function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "emvspk8i");
//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/bookgram/image/upload",
//       {
//         method: "POST",
//         body: FormData,
//       }
//     );

//     const data = await res.json();
//     console.log(data);
//     // const res = await fetch("/api/graphql", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({
//     //     query: `
//     //       mutation {
//     //         update(input:{userId:"${context.userId}",username:"${username}",phone:"${phone}"}){
//     //           _id
//     //         }
//     //       }
//     //       `,
//     //   }),
//     // });
//     // const data = await res.json();
//     // console.log(data);
//   }
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           onChange={(event) => setUser(event.target.value)}
//           placeholder="نام کاربری"
//           type="text"
//         />
//         <input
//           onChange={(event) => setphone(event.target.value)}
//           placeholder="شماره همراه"
//           type="text"
//         />
//         <input
//           onChange={(event) => setImage(event.target.files[0])}
//           type="file"
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// };
// //username  //upload   //phone

// export default Index;

import React, { useState } from "react";

export default function Upload() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
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
    console.log(base64EncodedImage);
    // try {
    //   await fetch("/api/upload", {
    //     method: "POST",
    //     body: JSON.stringify({ data: base64EncodedImage }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   setFileInputState("");
    //   setPreviewSource("");
    //   setSuccessMsg("Image uploaded successfully");
    // } catch (err) {
    //   console.error(err);
    //   setErrMsg("Something went wrong!");
    // }
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
