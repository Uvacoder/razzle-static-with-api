const { gql } = require('apollo-server-micro')
const db = require('./db.json')

const typeDefs = gql`
  type Page {
    id: ID!
    path: String!
    title: String!
    content: String!
  }
  type Query {
    getPage (path: String!): Page
    getAllPages: [Page]
  }
`
const resolvers = {
	Query: {
    getPage(parent, args, context) {
      return db.find((item) => item.path === args.path);
    },
    getAllPages(parent, args, context) {
      return db;
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
