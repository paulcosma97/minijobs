import { Service } from "typedi";
import ExpressRouter from "../../../shared/module/express.router";

@Service()
export class UserRouter extends ExpressRouter {
    getUser = this.registerRoute('get', '/greet', (req, res) => {
        res.json({ test: 'test' });
    })
}