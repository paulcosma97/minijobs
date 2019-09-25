import { Router } from 'express';
import * as authRouter from './auth.route';
import * as jobRouter from './job.route';

const routes: Router[] = [
  authRouter.router,
  jobRouter.router,
];

export default routes;