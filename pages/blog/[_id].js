import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/auth-context";
import BooksContext from "../../context/books-context";
import Layout from "../../components/layout/Layout";
import queryGraphQl from "../../shared/query-graphql/index";
import BlogDataShow from "../../components/Blog/blog_data_show";
import { useRouter } from "next/router";
export default function Id(props) {
  const router = useRouter();
  //search component data
  const contextBooks = useContext(BooksContext);
  contextBooks.books = props.dataBooks.books;

  const context = useContext(AuthContext);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout navbar={props.dataBooks.books}>
      <BlogDataShow data={props.data.post.data} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const dataQQ = await queryGraphQl(`query {
    posts{
     _id

  }
}`);
  const paths = dataQQ.posts.map((e) => ({
    params: {
      _id: e._id,
    },
  }));
  return { paths: paths, fallback: true };
};

export const getStaticProps = async ({ params: { _id } }) => {
  const dataQQ = await queryGraphQl(`
  query {
    post(_id:"${_id}") {
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
  const dataQQ1 = await queryGraphQl(`
  query {
    books {
      title,
  author,
  _id
  }
  }
  `);
  return {
    props: { data: dataQQ, dataBooks: dataQQ1 },
    revalidate: 1,
  };
};
