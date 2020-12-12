import fetch from "isomorphic-unfetch";
import Layout from "../components/layout/Layout";
import Books from "../components/Book/Book_All/booksContainer";
import BaseUrl from "../url";
import queryGraphQl from "../shared/query-graphql/index";
export default function propssing(props) {
  return (
    <>
      <Layout navbar={props.data.books}>
        <main className="home-grid">
          <Books data={props.data.books}></Books>
          <h1>a</h1>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  // const res = await fetch(`${BaseUrl}/api/graphql`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     query: `
  //     query {
  //       books {
  //                title
  //                image
  //                _id
  //                ratingStar
  //                author
  //                comments {
  //                 rate
  //               }
  //            }
  //     }`,
  //   }),
  // });
  // const data11 = await res.json();

  const dataQQ = await queryGraphQl(`
  query {
    books {
             title
             image
             _id
             ratingStar
             author
             comments {
              rate
            }
         }
  }
  `);

  return {
    props: { data: dataQQ },
  };
}

// export async function getServerSideProps(context) {
//   const res = await fetch(`${BaseUrl}/api/graphql`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: `
//       query {
//         books {
//                  title
//                  image
//                  _id
//                  ratingStar
//                  author
//                  comments {
//                   rate
//                 }
//              }
//       }`,
//     }),
//   });
//   const data11 = await res.json();

//   return {
//     props: { data: data11 },
//   };
// }
