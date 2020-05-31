import Repository from './repository.interface';
import ServerConfiguration from '../config/types/server.config';
import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';
import Entity from './entity.model';
import Optional from "../utils/optional";
import {EntityNotFoundError} from "./error";


export default abstract class DynamoRepository<EntityLike extends Entity> implements Repository<EntityLike> {
    protected tableName: string;
    protected database: DynamoDB.DocumentClient;

    constructor(tableName: string, serverConfig: ServerConfiguration) {
        this.tableName = `mj-${serverConfig.environment}-${tableName}`;
        this.database = new DynamoDB.DocumentClient();
    }

    async find(key: string): Promise<Optional<EntityLike>> {
        try {
            const result = await this.database.get({
                TableName: this.tableName,
                Key: {
                    id: key
                }
            }).promise();

            return Optional.of(result.Item as EntityLike);
        } catch (e) {
            return Optional.empty;
        }
    }

    async delete(key: string): Promise<void> {
        await this.database.delete({
            TableName: this.tableName,
            Key: {
                id: key
            }
        }).promise();
    }

    async save(entity: EntityLike): Promise<EntityLike> {
        if (!entity.id) {
            entity.id = uuid.v4();
        }

        await this.database.put({
            TableName: this.tableName,
            Item: entity
        }).promise();

        return entity;
    }

    async findBy<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<Optional<EntityLike>> {
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

    findOrFail(key: string): Promise<EntityLike> {
        return this.find(key).then(entity => entity.orThrow(EntityNotFoundError))
    }

    findByOrFail<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<EntityLike> {
        return this.findBy(field, value).then(entity => entity.orThrow(EntityNotFoundError))
    }
}