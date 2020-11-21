import BookItem from "./BookItem";
import Link from "next/link";

const Popular = (props) => {
  return (
    <>
      <h1>Popular</h1>
      <Link href="/popbook">
        <h6>All book</h6>
      </Link>
      <BookItem data={props.data} />
    </>
  );
};
export default Popular;
