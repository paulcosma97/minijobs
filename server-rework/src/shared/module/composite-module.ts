import Module from './module.interface';
import {ConfigurationPrototype} from './make-config';

export default class CompositeModule implements Module {
    constructor(private modules: Module[]) {}

    getDeclarations(): Function[] {
        return this.modules.map(module => (module.getDeclarations && module.getDeclarations()) || []).flat();
    }

    getFactories(): Function[] {
        return this.modules.map(module => (module.getFactories && module.getFactories()) || []).flat();
    }

    getConfigurations(): ConfigurationPrototype<any>[] {
        return this.modules.map(module => (module.getConfigurations && module.getConfigurations()) || []).flat();
    }
}
