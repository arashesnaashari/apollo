import BookItem from "./BookItem";
import Link from "next/link";

const Last = (props) => {
  return (
    <>
      <h1>Last</h1>
      <Link href="/lastbook">
        <h6>All book</h6>
      </Link>
      <BookItem data={props.data} />
    </>
  );
};
export default Last;
