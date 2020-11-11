import Head from "next/head";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CommentsForm from "./CommentsForm";
import Comments from "./Comments";
const Books_Query = gql`
  query BookQuery($id: String!) {
    book(id: $id) {
      title
      group
      author
      publication
      price
      image
    }
  }
`;
// BookQuery($varId: String!)
const Book = ({ id }) => {
  return (
    <Query query={Books_Query} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <img src="vercel.svg" />;
        if (error) console.log(error);
        return (
          <>
            <div style={{ display: "flex" }}>
              <img src={data.book.image} />
              <span>{data.book.title} | </span>
              <span>{data.book.group} | </span>
              <span>{data.book.author} | </span>
              <span>{data.book.publication} | </span>
              <span>{data.book.price}</span>
            </div>
            <button>Buy</button>
            <CommentsForm />
            <Comments/>
          </>
        );
      }}
    </Query>
  );
};

export default Book;
