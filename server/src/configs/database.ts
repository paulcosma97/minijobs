import { ConnectionOptions, createConnection } from 'typeorm'
import path from 'path';
import env from './env';

export async function makeConnection() {
    const connectionOptions: ConnectionOptions = {
        type: env.database.type as any,
        port: env.database.port,
        synchronize: true,
        logging: false,
        host: env.database.host,
        username: env.database.user,
        database: env.database.name,
        password: env.database.password,
        entities: [
            path.join(__dirname, '../models/*.model.ts')
        ],
    }
    
    return createConnection(connectionOptions)
}