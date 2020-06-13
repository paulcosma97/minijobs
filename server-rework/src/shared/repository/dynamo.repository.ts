import Repository from './repository.interface';
import ServerConfiguration from '../config/types/server.config';
import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';
import Entity from './entity.model';
import Optional from '../utils/optional';
import {EntityNotFoundError} from './error';


export default abstract class DynamoRepository<EntityLike extends Entity> implements Repository<EntityLike> {
    protected tableName: string;
    protected database: DynamoDB.DocumentClient;

    constructor(tableName: string, serverConfig: ServerConfiguration) {
        this.tableName = `mj-${serverConfig.environment}-${tableName}`;
        this.database = new DynamoDB.DocumentClient();
    }

    async findOne(key: string): Promise<EntityLike> {
        try {
            const result = await this.database.get({
                TableName: this.tableName,
                Key: {
                    id: key
                }
            }).promise();

            return result.Item as EntityLike;
        } catch (e) {
            return null;
        }
    }

    async deleteOne(key: string): Promise<void> {
        await this.database.delete({
            TableName: this.tableName,
            Key: {
                id: key
            }
        }).promise();
    }

    async saveOne(entity: EntityLike): Promise<EntityLike> {
        if (!entity.id) {
            entity.id = uuid.v4();
        }

        await this.database.put({
            TableName: this.tableName,
            Item: entity
        }).promise();

        return entity;
    }

    async findOneBy<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<EntityLike> {
        try {
            const result = await this.database.get({
                TableName: this.tableName,
                Key: {
                    [field]: value
                }
            }).promise();
            return Optional.of(result.Item as EntityLike);
        } catch (e) {
            return Optional.empty;
        }
    }

    findOneOrFail(key: string): Promise<EntityLike> {
        return this.findOne(key).then(entity => entity.orThrow(EntityNotFoundError));
    }

    findOneByOrFail<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<EntityLike> {
        return this.findOneBy(field, value).then(entity => entity.orThrow(EntityNotFoundError));
    }
}