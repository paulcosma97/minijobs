import { Router } from 'express';
import * as authRouter from './auth.route';
import * as ListedJobRouter from './listed-job.route';

const routes: Router[] = [
  authRouter.router,
  ListedJobRouter.router,
];

export default routes;