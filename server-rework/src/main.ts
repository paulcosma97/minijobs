import AppModule from './shared/app.module';
import UserModule from './shared/modules/user/user.module';
import JobsModule from './modules/jobs/jobs.module';
import ConfigurationModule from './shared/config/config.module';

const appModule = new AppModule([new ConfigurationModule(), new UserModule(), new JobsModule()]);

appModule.initializeDeclarations();

export default appModule;
