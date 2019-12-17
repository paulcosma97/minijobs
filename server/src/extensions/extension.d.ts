import { User } from "../models/user.model";


declare namespace Express {
    export interface Response {
        locals: {
            user: User
        };
        test: string;
    }
}

// export = global