import 'reflect-metadata';
import AppModule from './shared/app.module';
import UserModule from './shared/modules/user/user.module';
import JobsModule from './modules/jobs/jobs.module';
import ConfigurationModule from './shared/config/config.module';
import SharedModule from './shared/shared.module';

const appModule = new AppModule([
    new ConfigurationModule(),
    new SharedModule(),
    new UserModule(),
    new JobsModule()
]);

appModule.initializeDeclarations();

export default appModule;
