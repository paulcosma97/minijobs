import { Router } from "express";
import { restrictAccess, AuthenticatedState } from "../services/auth.service";
import { UserPermissionMask } from "../utils/permissions";
import * as ListedJobService from '../services/listed-job.service';
import { handleError } from "../utils/error-handler";

export const router = Router();

router.get('/listed-job',
  restrictAccess({ authenticated: AuthenticatedState.AUTHENTICATED, permissions: [ UserPermissionMask.CanViewListedJobs ] }), 
  (req, res) => ListedJobService.fetchListedJobs(req.query && req.query.page).then(ListedJobs => res.json(ListedJobs)).catch(handleError(res)));