import Link from "next/link";
const BookItem = ({ data }) => {
  return (
    <Link href={`/blog/${data._id}`}>
      <div class="blog-post--container">
        <div class="blog-post--wrap">
          <div class="blog-post--content">
            <h1>{data.title}</h1>
            <p class="blog-post--text">{data.body}</p>
          </div>
          <img src={data.image} alt="post" width="120" />
        </div>
        <div class="user">
          <img src={data.creator.profileURL} alt="" />
          <h4>{data.creator.username}</h4>
        </div>
        <div class="midline2"></div>
      </div>
    </Link>
  );
};
export default BookItem;
