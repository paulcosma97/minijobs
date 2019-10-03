// @ts-ignore
import env from '../../env.json';

interface Environment {
    production: boolean,
    debug: boolean,
    ssl: {
        certificate: string,
        key: string
    },
    database: {
        type: 'mysql',
        host: string,
        port: number,
        user: string,
        password: string,
        name: string
    },
    jwt: {
        secret: string
    },
    administrators: string[],
    aws: {
        credentials: {
            accessKey: string,
            secretAccessKey: string
        },
        s3: {
            bucket: {
                name: string,
                url: string
            }
        }
    }
}

export default env as Environment;