import { Router } from "express";
import { handleError } from "../utils/error-handler";
import { ssh } from "../utils/misc";

export const router = Router();

router.get('/revision', (_, res) => {
    return ssh('git rev-parse --short HEAD')
      .then(revision => res.json({
          revision
      }))
      .catch(handleError(res))
  });