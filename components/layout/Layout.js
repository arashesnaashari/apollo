import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => (
  <div>
    <Head>
      <title>bookgram</title>
    </Head>
    <Navbar />
    <hr></hr>
    <div className="container">{props.children}</div>
    <Footer />
  </div>
);

export default Layout;
