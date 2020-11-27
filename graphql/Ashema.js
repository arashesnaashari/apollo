import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Book {
    _id: ID!
    title: String!
    group: String!
    author: String!
    publication: String!
    image: String!
    price: Int!
    comments: [Comment!]
  }
  type User {
    _id: ID!
    username: String!
    password: String!
    phone: String!
    posts: [Post!]
    comments: [Comment!]
  }
  type Comment {
    _id: ID!
    rate: Int!
    text: String!
    creator: User!
    book: Book!
    date: String!
  }
  type View {
    _id: ID!
    rate: Int!
    text: String!
    creator: User!
    post: Post!
    date: String!
  }
  type Post {
    _id: ID!
    title: String!
    body: String!
    creator: User!
    views: [View!]
    date: String!
    image: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpire: Int!
  }

  input UserInput {
    username: String!
    password: String!
    phone: String!
  }
  input CommentInput {
    text: String!
    rate: Int!
    bookId: String!
    userId: String!
  }
  input viewsToPost {
    text: String!
    rate: Int!
    postId: String!
    userId: String!
  }
  input PostInput {
    userId: String!
    title: String!
    body: String!
    image: String!
  }

  type Query {
    users: [User!]
    books: [Book!]
    posts: [Post!]
    book(_id: ID!): Book
    post(_id: ID!): Post
    login(username: String!, password: String!): AuthData
  }
  type Mutation {
    signIn(input: UserInput): User
    createComment(input: CommentInput): Comment
    createPost(input: PostInput): Post
    createView(input: viewsToPost): View
  }
`;

module.exports = typeDefs;
// //type Mutation {
//   bookTrips(launchIds: [ID]!): TripUpdateResponse!
//   cancelTrip(launchId: ID!): TripUpdateResponse!
//   login(email: String): User
// }
