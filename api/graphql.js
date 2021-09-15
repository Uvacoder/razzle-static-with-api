const { ApolloServer, makeExecutableSchema } = require('apollo-server-micro')
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core")
const cors = require('micro-cors')()
const { send } = require('micro')

const { typeDefs, resolvers  } = require('./schema')

module.exports = async function handler(req, res) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    stopOnTerminationSignals: true,
    introspection: true
  })
  await apolloServer.start();
  const handler = await apolloServer.createHandler({
    path: req.url
  });
  return cors((req, res) =>
    req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res)
  )(req, res)
}
