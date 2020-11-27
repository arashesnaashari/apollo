import { useRouter } from "next/router";
// import gql from "graphql-tag";
// import { Query } from "react-apollo";
import CommentsForm from "./CommentsForm";
import Comments from "./Comments";
// const Books_Query = gql`
//   query BookQuery($_id: String!) {
//     book(_id: $_id) {
//       title
//       group
//       author
//       publication
//       price
//       image
//       comments {
//         text
//         rate
//         _id
//         creator {
//           username
//         }
//       }
//     }
//   }
// `;
// const res = fetch("http://localhost:3000/api/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       query: `
//   query {
//     book(_id:"5fa85dbeae4337bd0925c2b0") {
//              title
//              group
//              author
//              publication
//              price
//              image
//              comments {
//                text
//                rate
//                _id
//                creator {
//                  username
//               }
//            }
//          }
//   }`,
//     }),
//   });
//   const data =res.json();
// BookQuery($varId: String!)
const Book = ({ data }) => {
  // let x = useRouter().query.id;

  return (
    // <Query query={Books_Query} variables={{ _id: useRouter().query.id }}>
    //   {({ loading, error, data }) => {
    //     if (loading) return <img src="vercel.svg" />;
    //     if (error) console.log(error);
    //     return (
    //       <>
    //         <div style={{ display: "flex" }}>
    //           <img src={data.book.image} />
    //           <span>{data.book.title} | </span>
    //           <span>{data.book.group} | </span>
    //           <span>{data.book.author} | </span>
    //           <span>{data.book.publication} | </span>
    //           <span>{data.book.price}</span>
    //         </div>
    //         <button>Buy</button>
    //         {data.book.comments.map((comment) => {
    //           return <>{<Comments comment={comment} key={comment._id} />}</>;
    //         })}
    //       </>
    //     );
    //   }}
    // </Query>
    <h1>Dd</h1>
  );
};
// export async function getServerSideProps(context) {

//   return {
//     props: {
//       data,
//     },
//   };
// }
export default Book;
