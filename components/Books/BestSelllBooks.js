import BookItem from "./BookItem";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const Books_Query = gql`
  query BooksQuery {
    books {
      title
      _id
      image
    }
  }
`;

const Best = () => {
  return (
    <>
      <h1>Best</h1>
      <Query query={Books_Query}>
        {({ loading, error, data }) => {
          if (loading) return <img src="vercel.svg" />;
          if (error) console.log(error);
          return (
            <div style={{ display: "flex" }}>
              {data.books.map((book) => (
                <BookItem
                  key={book._id}
                  title={book.title}
                  image={book.image}
                  id={book._id}
                />
              ))}
            </div>
          );
        }}
      </Query>
    </>
  );
};
export default Best;
