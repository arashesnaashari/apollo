import Link from "next/link";
const BookItem = ({ data }) => {
  return (
    <>
      <div style={{ background: "lightgray" }}>
        <img src={data.image} width="50" />
        <h1>{data.title}</h1>
        <p>{}</p>
      </div>
    </>
  );
};
export default BookItem;
