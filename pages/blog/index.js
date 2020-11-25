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
  const res = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        posts{
          title,
          body,
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
