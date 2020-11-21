import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useApolloClient } from "react-apollo";

import { gql } from "apollo-boost";
//5fa85dbeae4337bd0925c2b1
const Comment_Mutation = gql`
  mutation Comment_Mutation($text: String!, $rate: Int!, $book: String!) {
    createComment(input: { text: $text, rate: $rate, book: $book }) {
      username
    }
  }
`;

const CommentsForm = ({ id }) => {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  const [createCommentMutation, { loading, error }] = useMutation(
    Comment_Mutation
  );
  const client = useApolloClient();
  async function handleSubmit(event) {
    event.preventDefault();

    createCommentMutation({ variables: { text, rate, book: "5fa85dbeae4337bd0925c2b1" } });
  }

  return (
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
    </form>
  );
};

export default CommentsForm;
