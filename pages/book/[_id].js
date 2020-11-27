import React, { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth-context";
import Layout from "../../components/layout/Layout";
export default function Id(props) {
  const context = useContext(AuthContext);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  const [comments, setComments] = useState(props.data.data.book.comments);
  const router = useRouter();
  const { _id } = router.query;
  const NumericRate = parseInt(rate);
  async function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
        createComment(input:{text:"${text}",rate:${NumericRate},book:"${_id}"}){
          text
          _id
          date
          creator {
            username
          }
        }
      }`,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(props.data.data.book));
  }

  return (
    <Layout>
      <main className="ebook-landing-grid">
        {/* Book Info */}
        <section className="ebook-showcase">
          <div className="showcase-content">
            <h1>
              {props.data.data.book.title}
              <br />
            </h1>
            <span className="author"> {props.data.data.book.author}</span>
            <div className="book-rating">
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9734;</span>
            </div>
            <div className="add-book">
              <div className="add-book--box">
                <a href="#">افزودن به کتابخانه</a>
              </div>
              <span className="price">
                {" "}
                {props.data.data.book.price}000 ريال
              </span>
            </div>
            <div className="book-sample">
              <a className="book-sample--link" href="#">
                مشاهده نمونه
              </a>
            </div>
            <p className="sell-description">
              فقط برای مدت محدود {props.data.data.book.price}000 ریال <br />
              با خرید شما با شرایط و ضوابط موافقت می کنید
            </p>
          </div>
          <div className="ebook-showcase--image">
            <img src={props.data.data.book.image} alt="s" />
          </div>
        </section>

        <section className="about-book">
          <svg className="about-book--icon icon-about-book">
            <use xlinkHref="../img/symbol-defs.svg#icon-about-book"></use>
          </svg>
          <h1>درباره کتاب</h1>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در
          </p>
        </section>
        {/* Form */}
        {!context.token && <h5>برای نظر دادن وارد شوید</h5>}
        {context.token && (
          <form onSubmit={handleSubmit}>
            <input
              placeholder="text .. "
              type="text"
              required
              onChange={(event) => setText(event.target.value)}
            />
            <input
              placeholder="rate"
              type="number"
              min="1"
              max="5"
              required
              onChange={(event) => setRate(event.target.value)}
            />
            <button type="submit">Submit</button>
            <div className="midline"></div>
          </form>
        )}
        <div className="midline"></div>

        {/* Comments */}
        <section className="comments">
          <h1 className="comments--title">نظرهای کاربران</h1>
          <div className="comments--right">
            <div className="comment">
              {props.data.data.book.comments.map((e) => {
                return (
                  <div key={e._id}>
                    <div className="comment--title">
                      <div className="comment--title__content">
                        <img src="../img/comment-3.png" alt="comment" />
                        <div className="comment--title__text">
                          <h1>{e.creator.username}</h1>
                          <span className="time">{e.date}</span>
                        </div>
                      </div>

                      {/* <svg className="icon-comments">
                        <use xlinkHref="../img/symbol-defs.svg#icon-comments"></use>
                      </svg> */}
                      <span>{e.rate}</span>
                    </div>
                    <p className="comment--text">{e.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        book(_id:"${params._id}") {
          title,
      image,
      group,
      author,
      publication
      price
      comments{
        text
        _id
        date
        rate
        creator{
          username
        }
      }
    }
  }`,
    }),
  });
  const data11 = await res.json();

  return {
    props: { data: data11 },
  };
}
