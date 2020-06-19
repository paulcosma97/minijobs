import 'reflect-metadata';
import appModule from './main';
import {Container} from 'typedi';
import {ServerPortToken} from './shared/request/express.interface';
import {globalEventEmitter} from './shared/utils/global-event-emitter';
import { createServer } from 'http';

(async () => {
    const port = Container.get(ServerPortToken);
    const httpServer = createServer(appModule.application);

    httpServer.listen(port, () => {
        console.log(`\nServer listening on port ${port}.`);
        globalEventEmitter.emit('server:start');
    });

    globalEventEmitter.once('server:stop', () => {
        httpServer.close();
    })
})();
