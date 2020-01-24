import Module from "../../shared/module";
import { UserRouter } from "./route/user.router";
import ExpressRouter from "../../shared/express.router";
import Container from "typedi";

export default class UserModule implements Module {
    getDeclarations(): Function[] {
        return [
            UserRouter
        ]
    }
}