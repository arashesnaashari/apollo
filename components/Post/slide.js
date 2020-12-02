import Link from "next/link";

const Popular = ({ data }) => {
  return (
    <>
      <section class="blog-latest-post">
        <div class="cards-primary">
          <div class="card-primary">
            <img
              class="card-primary--image"
              src={data[0].image}
              alt="reveiw section"
            />
            <span class="user">
              <span class="user--box">{data[0].creator.username}</span>
              <span class="user--post-time">
                <span class="middot">.</span>
                <span>{data[0].date}</span>
              </span>
            </span>
            <div class="card-primary--description">
              <h1 class="title">{data[0].title}</h1>
              <p class="description">{data[0].body}</p>
            </div>
            <div class="card-primary--author">
              <img
                src="../img/jacob parsson.png"
                alt="review-author"
                class="review-author"
              />
              <span class="author-name">{data[0].creator.username}</span>
            </div>
          </div>
        </div>
        <div class="blog--user-post">
          <div class="input-post">
            <input type="text" placeholder="بلاگ خودت را بساز" />
            <a href="#">
              <svg class="icon-book-alt2">
                <use xlinkHref="../img/symbol-defs.svg#icon-book-alt2"></use>
              </svg>
            </a>
          </div>
          <h2>"عنوان را وارد کنید و شروع کنید"</h2>
        </div>
      </section>
    </>
  );
};
export default Popular;
