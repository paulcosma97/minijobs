import { Router } from "express";
import { restrictAccess, AuthenticatedState } from "../services/auth.service";
import * as fileService from '../services/file.service';
import { handleError } from "../utils/error-handler";

export const router = Router();

router.get(
  '/file/:guid',
  restrictAccess({ authenticated: AuthenticatedState.ANY }),
  (req, res) => fileService.getFileLink(req.params.guid).then(link => res.redirect(link)).catch(handleError(res))
);