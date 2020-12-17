import { useContext } from "react";
import Layout from "../components/layout/Layout";

export default function propssing(props) {
  const UploadToServer = async (e) => {
    const [file] = e.target.files;
    // const res = await fetch(`/api/graphql`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     query: `
    //     mutation {
    //         singleUpload(file:"${file}"){
    //           url
    //         }
    //       }`,
    //   }),
    // });
    // const data = await res.json();
    // console.log(data);
    console.log(file);
  };
  return (
    <>
      <form action="/api/upload" method="POST" encType="multipart/form-data">
        <input name="myImage" type="file" />
        {/* <input type="text" /> */}
        <input type="submit" value="Upload a file" />
      </form>
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
