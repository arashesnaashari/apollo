import React, { useState, useEffect, useContext } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import AuthContext from "../../context/auth-context";
import BooksContext from "../../context/books-context";
import Layout from "../../components/layout/Layout";
import queryGraphQl from "../../shared/query-graphql/index";

import useSWR, { mutate, trigger } from "swr";

const fetcher = (query) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function Id(props) {
  if (!props.data) return null;
  const context = useContext(AuthContext);
  const contextBooks = useContext(BooksContext);
  contextBooks.books = props.dataBooks.books;
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  // const [comments, setComments] = useState(props.data.book.comments);
  const router = useRouter();
  const { _id } = router.query;
  const NumericRate = parseInt(rate);
  const array = [];
  for (let i = 0; i < props.data.book.ratingStar; i++) {
    array.push(<span key={props.data.book._id}>&#9734;</span>);
  }

  const Mutation = {
    query: `mutation {
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
    }`,
  };
  const Query = {
    query: `query {
      book(_id:"${props.data.book._id}"){
       comments{
        text
        _id
        date
        rate
        creator{
          username
          _id
          profileURL
        }
      }
      }
    }`,
  };
  async function handleSubmit(event) {
    event.preventDefault();
    mutate(
      Query.query,
      {
        book: [
          ...data.book.comments,
          {
            text: text,
            _id: "123456789098765432123456",
            date: Date.now(),
            rate: rate,
            creator: {
              username: context.username,
              profileURL: context.profileURL,
              _id: context.userId,
            },
          },
        ],
      },
      false
    );
    try {
      const res = await fetch(`/api/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Mutation),
      });
      const data = await res.json();
      console.log(data.errors[0].message);
    } catch (error) {
      console.log(error.errors);
    }
    trigger(Mutation.query);
  }

  const { data, error } = useSWR(
    `query {
    book(_id:"${props.data.book._id}"){
     comments{
      text
      _id
      date
      rate
      creator{
        username
        _id
        profileURL
      }
    }
    }
  }`,
    fetcher,
    { initialData: props.data }
  );
  async function addToBookShelf(event) {
    event.preventDefault();
    try {
      const res = await fetch(`/api/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          mutation {
            addToShelf(input:{book:"${props.data.book._id}",userId:"${context.userId}"}){
              _id
            }
          }`,
        }),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  if (error) {
    console.log(error);
  }
  // const [comments, setComments] = useState(data.book.comments);
  let comments;
  if (data) {
    comments = data;
  }

  if (router.isFallback) {
    return <div>صفحه در حال ساخت است لطفا منتظر بمانید ....</div>;
  }
  return (
    <Layout navbar={props.dataBooks.books}>
      <main className="ebook-landing-grid">
        {/* Book Info */}
        <section className="ebook-showcase">
          <div className="showcase-content">
            <h1>
              {props.data.book.title}
              <br />
            </h1>
            <span className="author"> {props.data.book.author}</span>
            <div className="card--rating">{array}</div>
            <div className="add-book">
              <div className="add-book--box">
                <button onClick={addToBookShelf}>افزودن به کتابخانه</button>
              </div>
              <span className="price"> {props.data.book.price}000 ريال</span>
            </div>
            <div className="book-sample">
              <a className="book-sample--link" href="#">
                مشاهده نمونه
              </a>
            </div>
            <p className="sell-description">
              فقط برای مدت محدود {props.data.book.price}000 ریال <br />
              با خرید شما با شرایط و ضوابط موافقت می کنید
            </p>
          </div>
          <div className="ebook-showcase--image">
            <img src={props.data.book.image} alt="s" />
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

        {/* Comments && form */}

        <>
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
          <section className="comments">
            <h1 className="comments--title">نظرهای کاربران</h1>
            <div className="comments--right">
              <div className="comment">
                {console.log(data)}
                {data &&
                  data.book.comments.map((comment, i) => {
                    let rates = comment.rate;
                    let array1 = [];

                    for (let i = 0; i < rates; i++) {
                      array1.push(
                        <span
                          key={props.data.book._id}
                          style={{ color: "gold" }}
                        >
                          &#9734;
                        </span>
                      );
                    }

                    return (
                      <div key={comment._id}>
                        <div className="comment--title">
                          {/* user Info */}
                          <div className="comment--title__content">
                            <img
                              src={comment.creator.profileURL}
                              alt="comment"
                              width="60"
                            />
                            <div className="comment--title__text">
                              <h1>{comment.creator.username}</h1>
                              <span className="time">{comment.date}</span>
                            </div>
                          </div>

                          {/* delete btn && rate */}
                          <span>
                            {/* rate */}
                            {array1}
                            {comment.creator._id == context.userId && (
                              <button
                                onClick={async (event) => {
                                  event.preventDefault();
                                  const res = await fetch(`/api/graphql`, {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      query: `
                                      mutation {
                                        deleteComment(commentId:"${comment._id}"){
                                          _id
                                        }
                                      }
                                      `,
                                    }),
                                  });
                                  const data = await res.json();
                                  trigger(`mutation {
                                    deleteComment(commentId:"${comment._id}"){
                                      _id
                                    }
                                  }`);
                                }}
                              >
                                X
                              </button>
                            )}
                          </span>
                        </div>

                        {/* comment text */}
                        <p className="comment--text">{comment.text}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      </main>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const dataQQ = await queryGraphQl(`query {
    books(limit:2){
     _id

  }
}`);
  // Get the paths we want to pre-render based on posts
  const paths = dataQQ.books.map((e) => ({
    params: {
      _id: e._id,
    },
  }));
  return { paths: paths, fallback: true };
};

export const getStaticProps = async ({ params: { _id } }) => {
  const dataQQ = await queryGraphQl(`
  query {
    book(_id:"${_id}") {
      title,
  image,
  group,
  author,
  publication
  price
  ratingStar,
  _id
  comments{
    text
    _id
    date
    rate
    creator{
      username
      _id
      profileURL
    }
  }
  }
  }
  `);
  const dataQQ1 = await queryGraphQl(`query {
    books(limit:0) {
             title
             author
             _id
         }
  }`);
  return {
    props: { data: dataQQ, dataBooks: dataQQ1 },
    revalidate: 1,
  };
};
