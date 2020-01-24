import ExpressRouter from "./express.router";

export default interface Module {
    getDeclarations(): Function[];
}
