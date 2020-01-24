import appModule from './main';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import { createServer } from 'http';

const app = express();
const server = new ApolloServer({
    typeDefs: appModule.graphQLDefinitions[0].typeDefs as any,
    resolvers: appModule.graphQLDefinitions[0].resolvers as any
});

server.applyMiddleware({ app, path: '/graphql' })

app.use('*', cors());
createServer(app).listen(3000, () => console.log("GraphQL Server started on port 3000."))
