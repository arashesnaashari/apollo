import { useEffect } from "react";
import Link from "next/link";
const BookItem = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <Link href={`book/${props.id}`}>
        <a>
          <img alt="image" src={props.image} />
          <h4>{props.title}</h4>
        </a>
      </Link>
    </div>
  );
};
export default BookItem;
