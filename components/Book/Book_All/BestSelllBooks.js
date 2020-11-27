import BookItem from "./BookItem";
import Link from "next/link";

const Best = (props) => {
  return (
    <>
      <section className="best-sell-books">
        <div className="best-sell-books--title">
          <h1>پرفروش ها</h1>
          <Link href="/bestbook">
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
