import { Router } from "express";
import { restrictAccess, AuthenticatedState } from "../services/auth.service";
import { UserPermissionMask } from "../utils/permissions";
import * as ListedJobService from '../services/listed-job.service';
import { handleError } from "../utils/error-handler";
import { ListedJobDTO } from "../dtos/listed-job.dto";

export const router = Router();

router.get('/listed-job',
  restrictAccess({ authenticated: AuthenticatedState.AUTHENTICATED, permissions: [ UserPermissionMask.CanViewListedJobs ] }), (req, res) => {
    ListedJobService.fetchListedJobs(req.query && req.query.page || 0)
      .then(async result => {
        const dto = {
          ...result,
          listedJobs: await Promise.all(result.listedJobs.map(item => ListedJobDTO.from(item)))
        }
        res.json(dto)
      })
      .catch(handleError(res))
  });