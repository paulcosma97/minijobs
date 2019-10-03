import { Router } from "express";
import {
  restrictAccess,
  JWTCookieName,
  AuthenticatedState,
  authenticate
} from "../services/auth.service";
import { UserPermissionMask } from "../utils/permissions";
import logger from "../services/logger.service";
import { handleError } from "../utils/error-handler";
import { UserDTO } from "../dtos/user.dto";
export const router = Router();

router.post("/auth", (req, res) => authenticate(req.body.accessToken, res).then(user => {
    logger.debug(`Authenticated user ${user.email} using Facebook API`);
    res.json({});
}).catch(handleError(res)));

router.get("/profile", restrictAccess({ authenticated: AuthenticatedState.AUTHENTICATED, permissions: [UserPermissionMask.CanLogin] }), (_, res) => {
    UserDTO.from(res.locals.user).then(dto => res.json(dto));
  }
);

router.post("/logout", (_, res) => {
  res.clearCookie(JWTCookieName);
  res.json({});
});


