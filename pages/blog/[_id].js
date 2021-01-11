import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth-context";
import BooksContext from "../../context/books-context";
import Layout from "../../components/layout/Layout";
import queryGraphQl from "../../shared/query-graphql/index";
import BlogDataShow from "../../components/Blog/blog_data_show";
import { useRouter } from "next/router";
export default function Id(props) {
  //search component data

  const context = useContext(BooksContext);
  useEffect(() => {
    context.books = props.dataSearch.books;
  }, []);
  const router = useRouter();

  if (router.isFallback) {
    return <div>صفحه در حال ساخت است لطفا منتظر بمانید ....</div>;
  }
  return (
    <Layout navbar={props.dataSearch.books}>
      <BlogDataShow data={props.data.post.data} />
    </Layout>
  );
}

// export const getStaticPaths = async () => {
//   const dataQQ = await queryGraphQl(`query {
//     posts(limit:1){
//      _id

//   }
// }`);
//   const paths = dataQQ.posts.map((e) => ({
//     params: {
//       _id: e._id,
//     },
//   }));
//   return { paths: paths, fallback: true };
// };

// export const getStaticProps = async ({ params: { _id } }) => {
//   const dataQQ = await queryGraphQl(`
//   query {
//     post(_id:"${_id}") {
//       _id
//     date
//     creator {
//       username
//       profileURL
//       _id
//     }
//     data
//   }
//   }
//   `);
//   const dataSearch = await queryGraphQl(`
//   query {
//     books(limit:0) {
//       _id
//       title
//       author
//     }
//   }
//   `);
//   return {
//     props: { data: dataQQ, dataSearch: dataSearch },
//     revalidate: 1,
//   };
// };
export async function getServerSideProps({ params }) {
  const dataQQ = await queryGraphQl(`
  query {
    post(_id:"${params._id}") {
      _id
    date
    creator {
      username
      profileURL
      _id
    }
    data
  }
  }
  `);
  const dataSearch = await queryGraphQl(`
  query {
    books(limit:0) {
      _id
      title
      author
    }
  }
  `);

  if (!dataQQ) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: dataQQ, dataSearch: dataSearch },
  };
}
