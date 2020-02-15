import Repository from './repository.interface';
import ServerConfiguration from '../config/types/server.config';
import { DynamoDB } from 'aws-sdk';

export default abstract class DynamoRepository<Entity, Key> implements Repository<Entity, Key> {
    protected tableName: string;
    protected database: DynamoDB.DocumentClient;

    constructor(tableName: string, serverConfig: ServerConfiguration) {
        this.tableName = `mj-${serverConfig.environment}-${tableName}`;
        this.database = new DynamoDB.DocumentClient();
    }

    abstract find(key: Key): Promise<Entity>;
    abstract delete(key: Key): Promise<void>;
    abstract save(entity: Entity): Promise<Entity>;
}
