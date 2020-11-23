const { buildSchema } = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = buildSchema(`
scalar Date
type Book {
    _id : ID!,
    title: String!,
    group:String!,
    author:String!,
    publication:String!,
    image:String!,
    price:Int!
    comments:[Comment!]
}
type User {
    _id : ID!,
    username: String!,
    password:String!,
    phone:String!,
    posts:[Post],
    comments:[Comment!]
}
type Comment {
    _id : ID!,
    rate: Int!,
    text:String!,
    creator:User!
    book:Book!,
    createdAt:String!
    date: Date!
}
type Post {
    _id : ID!,
    like: Int!,
    dislike: Int!,
    text:String!,
    creator:User!
}
type AuthData {
    userId : ID!,
    token:String!,
    tokenExpire:Int!
}



input UserInput {
    username: String!,
    password:String!,
    phone:String!,
}
input CommentInput {
    text: String!,
    rate:Int!,
    book:String!
}
input PostInput {
    text: String!,
    rate:Int!,
}





type rootQuery {
    users:[User!]
    books:[Book!]
    book(_id:ID!):Book
    login(username:String!,password:String!):AuthData
}
type rootMutation {
    signIn(input:UserInput):User
    createComment(input:CommentInput):Comment
    createPost(input:PostInput):Post
    

}






schema {
    query:rootQuery,
    mutation:rootMutation
}

`);
