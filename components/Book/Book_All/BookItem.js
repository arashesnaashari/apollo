import Link from "next/link";
const BookItem = ({ data }) => {
  const array = [];
  for (let i = 0; i < data.ratingStar; i++) {
    array.push(<span key={data._id}>&#9734;</span>);
  }
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

        <span className="card--name"> {data.author} </span>
        <div className="card--rating">{array}</div>
      </div>
    </>
  );
};
export default BookItem;
