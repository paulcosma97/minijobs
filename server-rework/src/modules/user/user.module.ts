import Module from "../../shared/module/module.interface";
import { UserRouter } from "./route/user.router";

export default class UserModule implements Module {
    getDeclarations(): Function[] {
        return [
            UserRouter
        ]
    }
}