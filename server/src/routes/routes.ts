import { Router } from 'express';
import * as authRouter from './auth.route';
import * as listedJobRouter from './listed-job.route';
import * as fileRouter from './file.route';
import * as revisionRouter from './revision.route';

const routes: Router[] = [
  authRouter.router,
  listedJobRouter.router,
  fileRouter.router,
  revisionRouter.router
];

export default routes;