import 'reflect-metadata';
import AppModule from './shared/app.module';
import UserModule from './modules/user/user.module';
import ServerModule from './shared/server/server.module';

const appModule = new AppModule([
    new ServerModule(),
    new UserModule()
]);

appModule.initializeDeclarations();

export default appModule;