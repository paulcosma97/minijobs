import { Router } from "express";
import { restrictAccess, AuthenticatedState } from "../services/auth.service";
import { UserPermissionMask } from "../utils/permissions";
import * as jobService from '../services/job.service';
import { handleError } from "../utils/error-handler";

export const router = Router();

router.get('/jobs',
  restrictAccess({ authenticated: AuthenticatedState.AUTHENTICATED, permissions: [ UserPermissionMask.CanViewJobs ] }), 
  (req, res) => jobService.fetchJobs(req.query.page).then(jobs => res.json(jobs)).catch(handleError(res)));