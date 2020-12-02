import fetch from "isomorphic-unfetch";
import Layout from "../../components/layout/Layout";
import PostsContainer from "../../components/Post/postsContainer";
export default function propssing(props) {
  return (
    <>
      <Layout>
        <PostsContainer data={props.data.data.posts}></PostsContainer>
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
        posts{
          title,
          body,
          date,
          image
          _id,
          creator {
            username
          }
          views {
            rate
          }
        }
      }
      
      `,
    }),
  });
  const data11 = await res.json();

  return {
    props: { data: data11 },
  };
}

// export async function getStaticProps() {
//   const { users } = await queryGraphql(`
//     query {
//       users {
//      name
//       }
//     }
//   `);
//   return { props: { users } };
// }
