import appModule from './main';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import { createServer } from 'http';
import Container from 'typedi';

import {
    ExpressRequestToken,
    ExpressResponseToken
} from './shared/request/express.interface';

const app = express();

app.use('*', cors());
app.use('*', (req, res, next) => {
    Container.set(ExpressRequestToken, req);
    Container.set(ExpressResponseToken, res);
    next();
});

(async () => {
    const defs = await appModule.computeGraphQLDefinitions();

    const server = new ApolloServer({
        typeDefs: defs.typeDefs,
        resolvers: defs.resolvers,
        playground: {
            settings: {
                'request.credentials': 'include'
            }
        }
    });

    server.applyMiddleware({ app, path: '/graphql' });
    createServer(app).listen(3000, () =>
        console.log('GraphQL Server started on port 3000.')
    );
})();
