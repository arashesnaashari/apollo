import Link from "next/link";
import PostItem from "./postItem";

const Last = (props) => {
  return (
    <>
      <section class="blog-latest-post2">
        {props.data.map((post) => {
          return <PostItem data={post} key={post._id} />;
        })}
      </section>
    </>
  );
};
export default Last;
