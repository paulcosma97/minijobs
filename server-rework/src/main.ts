import 'reflect-metadata';
import AppModule from './shared/app.module';
import UserModule from './modules/user/user.module';

const appModule = new AppModule([
    new UserModule()
]);

appModule.initializeDeclarations();

export default appModule.expressApp;