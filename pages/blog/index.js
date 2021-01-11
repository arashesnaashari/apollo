import Layout from "../../components/layout/Layout";
import { useContext } from "react";
// import PostContainer from "../../components/Post/postsContainer";
// import queryGraphQl from "../../shared/query-graphql/index";
// import BooksContext from "../../context/books-context";

export default function propssing() {
  fetch("https://bookgram.vercel.app/api/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: `
    query {
      books(limit:0) {
        title
        author
        _id
        
      }
    }
    `,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  return (
    <>
      <Layout>
        <h1>j</h1>
      </Layout>
    </>
  );
}

// export async function getServerSideProps() {
//   const dataQQ = await queryGraphQl(`query {
//       posts(limit:0) {
//         _id
//     title
//     body
//     date
//     image
//     creator {
//       username
//       profileURL
//       _id
//     }
//       }

//   }`);

//   const dataSearch = await queryGraphQl(`query {
//     books(limit:0) {
//       title
//     image
//     _id
//     author
//     }

// }`);
//   return {
//     props: { data: dataQQ, dataSearch: dataSearch },
//   };
// }
