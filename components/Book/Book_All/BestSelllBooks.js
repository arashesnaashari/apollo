import BookItem from "./BookItem";
import Link from "next/link";

const Best = (props) => {
  return (
    <>
      <h1>Best</h1>
      <Link href="/bestbook">
        <a>All book</a>
      </Link>
      <div style={{ display: "flex" }}>
        {props.data.map((book) => {
          return (
            <BookItem data={book} key={book._id}/>
          );
        })}
      </div>
    </>
  );
};
export default Best;
