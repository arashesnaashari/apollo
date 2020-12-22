import fetch from "isomorphic-unfetch";
import Layout from "../../components/layout/Layout";
import Books from "../../components/Book/Book_All/booksContainer";
import queryGraphQl from "../../shared/query-graphql/index";

export default function propssing(props) {
  return (
    <>
      <Layout navbar={props.data.books}>
        <Books data={props.data.books}></Books>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const dataQQ = await queryGraphQl(`query {
    books {
             title
             image
             _id
         }
  }`);
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
//   query {
//     books {
//              title
//              image
//              _id
//          }
//   }`,
//     }),
//   });
//   const data11 = await res.json();

//   return {
//     props: { data: data11 },
//   };
// }
//https://bookgram-7jwu2afy9.vercel.app/
