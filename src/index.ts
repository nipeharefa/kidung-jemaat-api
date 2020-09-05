import express from 'express';
import server from './server';

const port = process.env.PORT || 3000;

const app = express();

server.applyMiddleware({ app, path: '/' });

app.listen({ port }, () => {
  console.log(`🚀 Server ready at port ${port}`);
});
