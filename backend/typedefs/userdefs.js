const { gql } = require('apollo-server-express');


const userdefs = gql`
scalar Upload
type User {
  id: ID!
  name: String
  email: String
  age: Int
  sex: String
  image:Upload
}

type withvalid {
  user: User
  message: String
}

type Query {
  users: [User!]!
  user(id: ID!): User!
}

type Mutation {
  createUser(
    name: String
    email: String
    age: Int
    sex: String
    image: Upload
  ): withvalid

  updateUser(
    id: ID!
    name: String
    email: String
    age: Int
    sex: String
    image: Upload
  ): withvalid

  deleteUser(id: ID!): Boolean
}

`;

module.exports = userdefs;
