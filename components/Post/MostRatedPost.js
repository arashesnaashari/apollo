import PostItem from "./POSTITEMB";
import Link from "next/link";

const Best = (props) => {
  return (
    <>
      <section class="blog-post">
        {props.data.map((post) => {
          return <PostItem data={post} key={post._id} />;
        })}
      </section>
    </>
  );
};
export default Best;
