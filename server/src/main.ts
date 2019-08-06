import 'reflect-metadata';
import { makeServer, makeClientServer } from './utils/server';
import { makeConnection } from './configs/database';
import * as bodyParser from 'body-parser';
import * as authRouter from './routes/auth.route';
import cors from 'cors';

const { app, server }= makeServer();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: (_, callback) => callback(null, true),
}))

app.use(authRouter.router);

makeConnection()
    .then(() => console.log(`Database connection established`))
    .catch(e => (console.log(e.message), process.exit(-1)));

server.listen(9000, () => console.log('MiniJobs API started on port 9000'));
