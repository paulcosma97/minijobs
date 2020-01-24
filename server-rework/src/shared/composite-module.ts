import Module from "./module";

export default class CompositeModule implements Module {
    constructor(private modules: Module[]) { }

    getDeclarations(): Function[] {
        return this.modules.map(module => module.getDeclarations()).flat()
    }
}