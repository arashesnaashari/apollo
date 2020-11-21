import BookItem from "./BookItem";
import Link from "next/link";

const Best = (props) => {
  return (
    <>
      <h1>Best</h1>
      <Link href="/bestbook">
        <h6>All book</h6>
      </Link>
      <BookItem data={props.data} />
    </>
  );
};
export default Best;
