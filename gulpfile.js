const gulp = require('gulp');
const { spawn } = require('child_process');

function exec(cmd, args, relativePath, cb) {
    const spawnOptions = {
        shell: true,
        cwd: `${process.cwd()}/${relativePath}`,
        stdio: 'inherit'
    };
    const npm = spawn(cmd, args, spawnOptions);
    npm.on('close', function(code) {
        if (code === 0) {
            cb();
        } else {
            cb(`Process exited with status ${code}`);
        }
    });
    process.once('SIGINT', function() {
        npm.kill();
    });
}

function execAsync(cmd, args, relativePath) {
    return new Promise((resolve, reject) => {
        exec(cmd, args, relativePath, err => {
            if (err) {
                reject({ error: err, relativePath });
            } else {
                resolve();
            }
        });
    });
}

gulp.task('build:server:clean-old-binaries', async () => {
    await execAsync('rm', ['-rf', './build'], './server-rework').catch(() => null);
});

gulp.task('build:server:transpile-source-code', async () => {
    await execAsync('npx', ['tsc'], './server-rework');
    await execAsync('mkdir', ['./build_src'], './server-rework');
    await execAsync('mv', ['-v', './*', '../build_src'], './server-rework/build');
    await execAsync('mkdir', ['./src'], './server-rework/build');
    await execAsync('mv', ['-v', '../build_src/*', './src'], './server-rework/build');
    await execAsync('rm', ['-rf ./build_src'], './server-rework');
    await execAsync('cp', ['../package.json', './package.json'], './server-rework/build');
    await execAsync('mkdir', ['./src/shared/graphql'], './server-rework/build');
    await execAsync(
        'cp',
        ['../src/shared/graphql/schema.graphql', './src/shared/graphql/schema.graphql'],
        './server-rework/build'
    );
});

gulp.task('build:server:install-dependencies', async () => {
    await execAsync('npm', ['i', '--production'], './server-rework/build');
});

gulp.task(
    'build:server',
    gulp.series(
        'build:server:clean-old-binaries',
        'build:server:transpile-source-code',
        'build:server:install-dependencies'
    )
);

gulp.task('aws:set-credentials', async () => {
    process.env.AWS_ACCESS_KEY_ID = 'AKIAZVZMKZ63GOYRD3UB';
    process.env.AWS_SECRET_ACCESS_KEY = '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';
});

gulp.task('terraform:apply', async () => {
    await execAsync('terraform', ['apply'], './ops');
});

gulp.task('deploy:terraform', gulp.series('aws:set-credentials', 'terraform:apply'));

gulp.task('deploy:server', gulp.series('build:server', 'deploy:terraform'));

gulp.task('serve:server', async () => {
    await execAsync('npx', ['nodemon'], './server-rework');
});
