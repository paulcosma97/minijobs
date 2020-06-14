import 'reflect-metadata';
import appModule from './main';

(async () => {
    const port = 3000;

    appModule.application.listen(port, () =>
        console.log(`\n🔥🔥🔥  Server listening on port ${port}.`)
    );
})();
