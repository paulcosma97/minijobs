const gulp = require('gulp');
const exec = require('child_process').exec;

const execAsync = (cmd, { verbose, path }) =>
    new Promise((resolve, reject) =>
        exec(`cd ${path} && ${cmd}`, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }

            if (verbose && stdout) {
                console.log(stdout);
            }

            if (verbose && stderr) {
                console.error(stderr);
            }

            resolve();
        })
    );

gulp.task('build:server:clean-old-binaries', async () => {
    await execAsync('rm -rf ./build', { path: './server-rework' }).catch(() => null);
});

gulp.task('build:server:transpile-source-code', async () => {
    await execAsync('npx tsc', { path: './server-rework' });
    await execAsync('mkdir ./build_src', { path: './server-rework' });
    await execAsync('mv -v ./* ../build_src', { path: './server-rework/build' });
    await execAsync('mkdir ./src', { path: './server-rework/build' });
    await execAsync('mv -v ../build_src/* ./src', { path: './server-rework/build' });
    await execAsync('rm -rf ./build_src', { path: './server-rework' });
    await execAsync('cp ../package.json ./package.json', { path: './server-rework/build' });
    await execAsync('mkdir ./src/shared/graphql', { path: './server-rework/build' });
    await execAsync('cp ../src/shared/graphql/schema.graphql ./src/shared/graphql/schema.graphql', {
        path: './server-rework/build'
    });
});

gulp.task('build:server:install-dependencies', async () => {
    await execAsync('npm i --production', { path: './server-rework/build' });
});

gulp.task(
    'build:server',
    gulp.series(
        'build:server:clean-old-binaries',
        'build:server:transpile-source-code',
        'build:server:install-dependencies'
    )
);

gulp.task(
    'deploy:server',
    gulp.series('build:server', async () => {
        await execAsync('terraform plan', { path: './ops' });
    })
);
