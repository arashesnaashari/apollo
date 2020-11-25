import PostItem from "./postItem";
import Link from "next/link";

const Best = (props) => {
  return (
    <>
      <h1>MostRated</h1>
      <Link href="/bestbook">
        <a>All book</a>
      </Link>
      <div>
        {props.data.map((post) => {
          return (
            <PostItem data={post} key={post._id}/>
          );
        })}
      </div>
    </>
  );
};
export default Best;