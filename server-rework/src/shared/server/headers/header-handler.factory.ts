import ServiceFactory from '../../module/factory';
import HeaderHandler, { HeaderHandlerToken } from './header-handler.interface';
import Container, { Token, Service, Inject } from 'typedi';
import ServerConfiguration, { ServerConfigurationToken } from '../config/server.config';
import LambdaHeaderHandler from './lambda-header-handler.service';
import { APIGatewayEventToken } from '../request/lambda.interface';
import ExpressHeaderHandler from './express-header-handler.service';
import { ExpressRequestToken, ExpressResponseToken } from '../request/express.interface';

@Service()
export default class HeaderHandlerFactory extends ServiceFactory<HeaderHandler> {
    constructor(@Inject(ServerConfigurationToken) private serverConfig: ServerConfiguration) {
        super();
    }

    getToken(): Token<HeaderHandler> {
        return HeaderHandlerToken;
    }

    build(): HeaderHandler {
        if (this.serverConfig.serverless) {
            return new LambdaHeaderHandler(() => Container.get(APIGatewayEventToken));
        }

        return new ExpressHeaderHandler(
            () => Container.get(ExpressRequestToken),
            () => Container.get(ExpressResponseToken)
        );
    }
}
