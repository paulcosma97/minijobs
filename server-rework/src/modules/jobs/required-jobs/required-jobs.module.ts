import Module from '../../../shared/module/module.interface';
import RequiredJobsRouter from './route/required-jobs.router';

export default class RequiredJobsModule implements Module {
    getDeclarations = (): Function[] => [RequiredJobsRouter];
}
