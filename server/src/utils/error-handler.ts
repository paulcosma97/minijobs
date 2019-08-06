import { Response } from 'express';
import { env } from 'process';

export class MiniJobsError extends Error {
    // Required to check type because instanceof MiniJobsError doesn't work
    public readonly miniJobsError = true;
    
    constructor(public statusCode: number, public info?: string) {
        super();
    }
}

export class ForbiddenError extends MiniJobsError {
    constructor(message?: string) {
        super(403, message);
    }
}

export class UnauthorizedError extends MiniJobsError {
    constructor(message?: string) {
        super(401, message);
    }
}

export class BadRequestError extends MiniJobsError {
    constructor(message?: string) {
        super(400, message);
    }
}

export const handleError = (res: Response) => (e: any | MiniJobsError) => {
    if (e.miniJobsError) {
        res.status(e.statusCode)
        return res.json({
            error: {
                statusCode: e.statusCode,
                message: e.info
            }
        });
    }

    console.log(e);
    res.status(500);
    env.debug ? res.json(e) : res.send();
}