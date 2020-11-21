// import Head from "next/head";
// import React, { useState, useMemo, useEffect } from "react";
// import gql from "graphql-tag";
// import Link from "next/link";

// import { Query } from "react-apollo";
// const Books_Query = gql`
//   query BooksQuery {
//     books {
//       title
//       _id
//       author
//     }
//   }
// `;
// // BookQuery($varId: String!)

// const Search = () => {
//   const [data, setData] = useState([]);
//   const [html, setHtml] = useState();

//   // const [country, setcountry] = useState("");
//   // const books = () => {
//   //   return book.books.filter((book) => {
//   //     return (
//   //       book.title.toLowerCase().includes(search.toLowerCase()) ||
//   //       book.author.toLowerCase().includes(search.toLowerCase())
//   //     );
//   //   });
//   // };
//   const inputEvent = (e) => {
//     let complitedResul;
//     if (e) {
//       complitedResul = data.filter((book) => {
//         return (
//           book.title.toLowerCase().trim().includes(e) ||
//           book.author.toLowerCase().trim().includes(e)
//         );
//       });

//       complitedResul = complitedResul.map((book) => (
//         <Link href={`book/${book._id}`}>
//           <p>
//             {book.title} | {book.author}
//           </p>
//         </Link>
//       ));
//     }

//     // console.log(complitedResult);
//     showcomplitedResult(complitedResul);
//   };
//   const showcomplitedResult = (complitedResul) => {
//     setHtml(complitedResul);
//   };

//   return (
//     <Query query={Books_Query}>
//       {({ loading, error, data }) => {
//         if (loading) return <input placeholder="waiting ... " />;
//         if (error) console.log(error);
//         setData(data.books);
//         return (
//           <>
//             <input
//               placeholder="searching ... "
//               onInput={(e) => inputEvent(e.target.value)}
//             />
//             {html}
//           </>
//         );
//       }}
//     </Query>
//   );
// };
// // const CountryListItem = ({ title, author }) => {
// //   return (
// //     <li className="list-group-item d-flex">
// //       <div className="col pt-2">
// //         {title} <span className="badge badge-info">{author}</span>
// //       </div>
// //     </li>
// //   );
// // };

// export default Search;

export default function Search() {
  return (
   
      <input placeholder="Serach .... "></input>
    
  );
}
