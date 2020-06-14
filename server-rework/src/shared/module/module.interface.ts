import {ConfigurationPrototype} from './make-config';

export default interface Module {
    getDeclarations?: () => Function[];
    getFactories?: () => Function[];
    getConfigurations?: () => ConfigurationPrototype<any>[];
}
