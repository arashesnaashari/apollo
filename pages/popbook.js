import fetch from "isomorphic-unfetch";
import Layout from "../components/layout/Layout";
import Books from "../components/Book/Book_All/PopularBooks";
export default function propssing(props) {
  return (
    <>
      <Layout>
        <Books data={props.data.data.books}></Books>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
  query {
    books {
             title
             image
             _id
         }
  }`,
    }),
  });
  const data11 = await res.json();

  return {
    props: { data: data11 },
  };
}
