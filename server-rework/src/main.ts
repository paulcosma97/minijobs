import 'reflect-metadata';
import AppModule from './shared/app.module';
import UserModule from './modules/user/user.module';
import ServerModule from './shared/server/server.module';
import JobsModule from './modules/jobs/jobs.module';

const appModule = new AppModule([new ServerModule(), new UserModule(), new JobsModule()]);

appModule.initializeDeclarations();

export default appModule;
