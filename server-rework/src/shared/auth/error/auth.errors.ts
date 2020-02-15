export class UnauthorizedError extends Error {
    constructor(msg?: string) {
        super(msg);
    }
}
