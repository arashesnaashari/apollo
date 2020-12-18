import { useState } from "react";
import Layout from "../components/layout/Layout";

export default function propssing(props) {
  const [img, setImg] = useState("");
  const Upload = (e) => {
    const formData = new FormData();
    formData.append("myFile", e.target.files[0]);
    console.log(formData);
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setImg(data.file))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form>
        <input type="file" name="upload" onChange={Upload} />
        <input type="submit" value="Upload" />
      </form>
      {img && <img src={`http://localhost:3000/${img}`} />}
    </>
  );
}

// export async function getStaticProps(context) {

//   const dataQQ = await queryGraphQl(`
//   query {
//     books {
//              title
//              image
//              _id
//              ratingStar
//              author
//              comments {
//               rate
//             }
//          }
//   }
//   `);

//   return {
//     props: { data: dataQQ },
//   };
// }
