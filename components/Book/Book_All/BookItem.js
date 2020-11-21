import Link from "next/link";
const BookItem = ({ data }) => {
  return (
    <>
      <h6>Ss</h6>
      {data.map((item) => {
        return (
          // CARD
          <div style={{ display: "flex" }}>
            <Link href={`/book/${item._id}`}>
              <span>{item.title}</span>
            </Link>
          </div>
        );
      })}
    </>
  );
};
export default BookItem;
