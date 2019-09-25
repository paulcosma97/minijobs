import "reflect-metadata";
import { makeServer } from "./utils/server";
import { makeConnection } from "./configs/database";
import * as bodyParser from "body-parser";
import cors from "cors";
import logger from "./services/logger.service";
import routes from "./routes/routes";

const { app, server } = makeServer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: (_, callback) => callback(null, true)
  })
);

routes.forEach(route => app.use(route));

makeConnection()
  .then(() => logger.info(`Database connection established`))
  .catch(e => (logger.error(e.message), process.exit(-1)));

server.listen(9000, () => logger.info("MiniJobs API started on port 9000"));
