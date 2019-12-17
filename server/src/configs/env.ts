function getEnv<T = any>(name: string, defaultValue?: T): T {
    const val = process.env[name];

    if (val === undefined) {
        return defaultValue;
    }

    if (defaultValue === undefined) {
        return val as any as T;
    }

    switch(typeof defaultValue) {
        case 'boolean': return !!val as any as T;
        case 'number': return +val as any as T;
        case 'string': return val + '' as any as T;
        default: {
            throw new Error(`Can't map type: '${typeof defaultValue}' of default value: '${defaultValue}'`);
        }
    }
}

const Environment = {
    debug: getEnv('MJ_DEBUG', true),
    production: getEnv('MJ_PROD', false),
    ssl: {
        certificate: getEnv('MJ_SSL_CERTIFICATE', 'etc/letsencrypt/live/mini-jobs-api.paulcsoft.com/fullchain.pem'),
        key: getEnv('MJ_SSL_KEY', 'etc/letsencrypt/live/mini-jobs-api.paulcsoft.com/privkey.pem')
    },
    database: {
        type: "mysql",
        host: "localhost",
        port: getEnv('MJ_DATABASE_PORT', 50500),
        user: "user",
        password: "root",
        name: "minijobs"
    },
    jwt: {
        secret: getEnv('MJ_JWT_SECRET', 'my-secret')
    },
    administrators: [
        "paul.cosma997@gmail.com"
    ],
    aws: {
        credentials: {
            accessKey: getEnv('MJ_AWS_CREDENTIALS_ACCESS_KEY', 'AKIAZVZMKZ63MOLYS7UW'),
            secretAccessKey: getEnv('MJ_AWS_CREDENTIALS_SECRET_ACCESS_KEY', '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')
        },
        s3: {
            bucket: {
                name: getEnv('MJ_AWS_S3_BUCKET_NAME', 'storage.minijobs.paulcsoft.com'),
                url: getEnv('MJ_AWS_S3_BUCKET_URL', 'http://storage.minijobs.paulcsoft.com.s3-website.eu-central-1.amazonaws.com'),
                userStorageUrl: getEnv('MJ_AWS_S3_BUCKET_USER_STORAGE_URL', 'https://d1b5c5en4rle6d.cloudfront.net')
            }
        }
    }
}

export default Environment;