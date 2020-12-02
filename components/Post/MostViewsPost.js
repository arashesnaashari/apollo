import Link from "next/link";
import PostItem from "./postItem";

const Popular = (props) => {
  return (
    <>
      <section class="blog-post2">
        {props.data.map((post) => {
          return <PostItem data={post} key={post._id} />;
        })}
      </section>
    </>
  );
};
export default Popular;
