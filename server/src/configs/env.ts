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
    }
}

export default env as Environment;