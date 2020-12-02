import Link from "next/link";
const BookItem = ({ data }) => {
  return (
    <>
      <div class="post2-container">
        <img src={data.image} alt="post" width="120" />
        <a href="#" class="post2-link">
          <div class="post2-content">
            <div class="post2-content--title">
              <h4>{data.creator.username}</h4>
              <span class="dot"></span>
              <span class="time">{data.date}</span>
            </div>
            <p class="post2-content--text">{data.title}</p>
          </div>
        </a>
      </div>
    </>
  );
};
export default BookItem;
