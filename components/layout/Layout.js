import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => (
  <div className="container">
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>BookGram</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="../../css/style.css" />
    </Head>
    <Navbar search={props.navbar}/>
    <div>{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
