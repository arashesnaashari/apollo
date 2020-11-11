import Head from "next/head";

import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import Books from "../components/Books/booksContainer";

export default function Home() {
  return (
    <Layout>
      <Container />
      <Books />
      {/* Blogs */}
    </Layout>
  );
}
