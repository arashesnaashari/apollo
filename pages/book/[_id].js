import React, { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth-context";
import Layout from "../../components/layout/Layout";
import BaseUrl from "../../url";

export default function Id(props) {
  const context = useContext(AuthContext);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  const [comments, setComments] = useState(props.data.data.book.comments);
  const router = useRouter();
  const { _id } = router.query;
  const NumericRate = parseInt(rate);
  const array = [];
  for (let i = 0; i < props.data.data.book.ratingStar; i++) {
    array.push(<span key={props.data.data.book._id}>&#9734;</span>);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch(`${BaseUrl}/api/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          mutation {
            createComment(input:
              {bookId:"${_id}",
                userId:"${context.userId}",
                rate:${NumericRate},text:"${text}"}){
                  text
                  _id
                  date
                  rate
                  creator{
                    username
                  }
            }
          }
          `,
        }),
      });
      const data = await res.json();
      const newComment = {
        text: text,
        rate: NumericRate,
        date: data.date,
        _id: data._id,
        creator: {
          username: data.creator.username,
        },
      };
      setComments([...comments, newComment]);
      console.log(data);
      console.log(comments);

      // console.log(data.createComment);
    } catch (error) {
      console.log(error);
    }
  }
  if (router.isFallback) {
    return <div>Loading...</div>;
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
            <div className="card--rating">{array}</div>
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
              {comments.map((comment) => {
                return (
                  <div key={comment._id}>
                    <div className="comment--title">
                      <div className="comment--title__content">
                        <img src="../img/comment-3.png" alt="comment" />
                        <div className="comment--title__text">
                          <h1>{comment.creator.username}</h1>
                          <span className="time">{comment.date}</span>
                        </div>
                      </div>

                      {/* <svg className="icon-comments">
                        <use xlinkHref="../img/symbol-defs.svg#icon-comments"></use>
                      </svg> */}
                      <span>{comment.rate}</span>
                    </div>
                    <p className="comment--text">{comment.text}</p>
                  </div>
                );
              })}

              {/* {props.data.data.book.comments.map((e) => {
              //   return (

              //   );
              // })} */}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

// Call an external API endpoint to get posts
// export async function getStaticPaths() {
//   //   const res = await fetch(`${BaseUrl}/api/graphql`, {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({
//   //       query: `
//   //     query {
//   //     books{
//   //      _id

//   //   }
//   // }`,
//   //     }),
//   //   });
//   //   const data11 = await res.json();
//   return {
//     paths: [
//       { params: { _id: "5fccf9191ef7dc210c8205b6" } },
//       { params: { _id: "5fa85dbeae4337bd0925c2b5" } },
//       { params: { _id: "5fa85dbeae4337bd0925c2b3" } },
//       { params: { _id: "5fa85dbeae4337bd0925c2b0" } },
//     ],
//     fallback: true, // See the "fallback" section below
//   };
// }

// export const getStaticPaths = async () => {
//   const res = await fetch(`${BaseUrl}/api/graphql`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: `
//           query {
//           books{
//            _id

//         }
//       }`,
//     }),
//   });
//   const data11 = await res.json();
//   // Get the paths we want to pre-render based on posts
//   const paths = data11.data.books.map((e) => ({
//     params: {
//       _id: e._id,
//     },
//   }));
//   // console.log(paths);
//   // const paths = data11.data.books.map((book) => `/book/${book._id}`);
//   // console.log(paths);
//   // console.log(paths);
//   // { params: { id: '5fa85dbeae4337bd0925c2b5' } },
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths: paths, fallback: false };
// };

// export const getStaticProps = async ({ params: { _id } }) => {
//   const res = await fetch(`${BaseUrl}/api/graphql`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: `
//       query {
//         book(_id:"${_id}") {
//           title,
//       image,
//       group,
//       author,
//       publication
//       price
//       ratingStar,
//       comments{
//         text
//         _id
//         date
//         rate
//         creator{
//           username
//         }
//       }
//     }
//   }`,
//     }),
//   });
//   const data11 = await res.json();

//   return {
//     props: { data: data11 },
//   };
// };
// https://realpython.com/instagram-bot-python-instapy/
// https://dev.to/danijelajs/javascript-instagram-bot-3nmk
// https://medium.com/@EsteveSegura/how-to-automate-an-instagram-account-without-being-discovered-with-javascript-9f14c160dcdc
// https://www.npmjs.com/package/tools-for-instagramd
export const getServerSideProps = async ({ params: { _id } }) => {
  const res = await fetch(`${BaseUrl}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query {
        book(_id:"${_id}") {
          title,
      image,
      group,
      author,
      publication
      price
      ratingStar,
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
};
