import 'reflect-metadata';
import {serverConfiguration} from './shared/config/values/server.config';
import {globalEventEmitter} from './shared/utils/global-event-emitter';

async function setup(): Promise<void> {
    console.log('Setting up test environment for Mocha.')
    serverConfiguration.runningTests = true;
    await import('./serverful');
}

setup();

const serverStarted = new Promise(resolve =>
    globalEventEmitter.once('server:start', () => resolve()))

before(async () => {
    await serverStarted;
    console.log('Mocha test environment successfully set up.');
});

after(() => {
    globalEventEmitter.emit('server:stop');
})
