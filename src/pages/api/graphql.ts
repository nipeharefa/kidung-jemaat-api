import cors from 'micro-cors';
import apolloServer from '../../helper/server';

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = apolloServer.createHandler({ path: '/api/graphql' });

// let b = cors();
export default cors()(handler);
