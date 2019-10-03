import { Router } from 'express';
import * as authRouter from './auth.route';
import * as listedJobRouter from './listed-job.route';
import * as fileRouter from './file.route';

const routes: Router[] = [
  authRouter.router,
  listedJobRouter.router,
  fileRouter.router
];

export default routes;