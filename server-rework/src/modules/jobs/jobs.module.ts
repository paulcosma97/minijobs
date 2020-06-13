import CompositeModule from '../../shared/module/composite-module';
import RequiredJobsModule from './required-jobs/required-jobs.module';

export default class JobsModule extends CompositeModule {
    constructor() {
        super([
            new RequiredJobsModule()
        ]);
    }
}