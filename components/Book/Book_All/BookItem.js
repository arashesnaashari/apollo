import Link from "next/link";
const BookItem = ({ data }) => {
  return (
    <>
      <div className="card">
        <Link href={`/book/${data._id}`}>
          <a>
            <img src={data.image} alt="book1" />
          </a>
        </Link>
        <header className="card--header">
          <Link href={`/book/${data._id}`}>
            <a>
              <h1>{data.title}</h1>
            </a>
          </Link>
        </header>

        <span className="card--name"> نام </span>
        <div className="card--rating">
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9734;</span>
        </div>
      </div>
    </>
  );
};
export default BookItem;
