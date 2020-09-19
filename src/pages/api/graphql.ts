import cors from 'micro-cors';
import apolloServer from '../../helper/server';

export const config = {
  api: {
    bodyParser: false
  }
};

const handlerGQL = apolloServer.createHandler({ path: '/api/graphql' });

let handler = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  return handlerGQL(req, res);
};

export default handler;
