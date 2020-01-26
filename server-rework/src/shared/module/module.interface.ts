import ServiceFactory from './factory';

export default interface Module {
    getDeclarations?: () => Function[];
    getFactories?: () => Function[];
}
