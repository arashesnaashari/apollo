import BookItem from "./BookItem";
import Link from "next/link";

const Best = (props) => {
  return (
    <>
      <section className="new-book">
        <div className="new-book--title">
          <h1>تازه ها</h1>
          <Link href="/lastbook">
            <a>
              <span>بیشتر &gt; &gt;</span>
            </a>
          </Link>
        </div>

        <div className="cards">
          {props.data.map((book) => {
            return <BookItem data={book} key={book._id} />;
          })}
        </div>
      </section>
      <div className="midline"></div>
    </>
  );
};
export default Best;
