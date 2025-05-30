const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema/schema');
const { graphqlUploadExpress } = require('graphql-upload');
const path = require('path');
require('./db/db');

const app = express();
app.use(express.json())

// Serve static files (e.g., uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Add the file upload middleware before Apollo middleware
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
