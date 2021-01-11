import { useContext } from "react";
import Layout from "../components/layout/Layout";
import Books from "../components/Book/Book_All/booksContainer";
import queryGraphQl from "../shared/query-graphql/index";
import BooksContext from "../context/books-context";

export default function propssing(props) {
  const context = useContext(BooksContext);
  context.books = props.data.books;

  return (
    <>
      <Layout navbar={props.data.books}>
        <main className="home-grid">
          <Books data={props.data.books}></Books>
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
    books(limit:0) {
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
    revalidate: 1,
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
