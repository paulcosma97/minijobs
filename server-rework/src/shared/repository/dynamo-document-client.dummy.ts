import { DynamoDB, Request, AWSError} from 'aws-sdk';
import Entity from './entity.model';
import {PromiseResult} from 'aws-sdk/lib/request';

export default class DynamoDocumentClientDummy implements DynamoDB.DocumentClient {
    public static tables: Map<string, Map<string, Entity>> = new Map();

    createSet(list: number[] | string[] | DynamoDB.DocumentClient.binaryType[], options?: DynamoDB.DocumentClient.CreateSetOptions): DynamoDB.DocumentClient.DynamoDbSet {
        throw new Error('Method not implemented.');
    }

    batchGet(params: DynamoDB.DocumentClient.BatchGetItemInput): Request<DynamoDB.DocumentClient.BatchGetItemOutput, AWSError> {
        throw new Error('Method not implemented.');
    }

    batchWrite(params: DynamoDB.DocumentClient.BatchWriteItemInput): Request<DynamoDB.DocumentClient.BatchWriteItemOutput, AWSError> {
        throw new Error('Method not implemented.');
    }

    delete(params: DynamoDB.DocumentClient.DeleteItemInput): Request<DynamoDB.DocumentClient.DeleteItemOutput, AWSError> {
        return this.wrap(() => this.unsetEntity(params.TableName, params.Key.id));
    }

    get(params: DynamoDB.DocumentClient.GetItemInput): Request<DynamoDB.DocumentClient.GetItemOutput, AWSError> {
        return this.wrap(() => this.getEntity(params.TableName, params.Key.id));
    }

    put(params: DynamoDB.DocumentClient.PutItemInput): Request<DynamoDB.DocumentClient.PutItemOutput, AWSError> {
        return this.wrap(() => {
            this.setEntity(params.TableName, params.Item.id, params.Item as any);
            return params.Item;
        })
    }

    query(params: DynamoDB.DocumentClient.QueryInput): Request<DynamoDB.DocumentClient.QueryOutput, AWSError> {
        throw new Error('Method not implemented.');
    }

    scan(params: DynamoDB.DocumentClient.ScanInput): Request<DynamoDB.DocumentClient.ScanOutput, AWSError> {
        throw new Error('Method not implemented.');
    }

    update(params: DynamoDB.DocumentClient.UpdateItemInput): Request<DynamoDB.DocumentClient.UpdateItemOutput, AWSError> {
        throw new Error('Method not implemented.');
    }

    transactGet(params: DynamoDB.DocumentClient.TransactGetItemsInput): Request<DynamoDB.DocumentClient.TransactGetItemsOutput, AWSError> {
        throw new Error('Method not implemented.');
    }

    transactWrite(params: DynamoDB.DocumentClient.TransactWriteItemsInput): Request<DynamoDB.DocumentClient.TransactWriteItemsOutput, AWSError> {
        throw new Error('Method not implemented.');
    }

    private getTable(tableName: string): Map<string, Entity> {
        const tables = DynamoDocumentClientDummy.tables;

        if (tables.has(tableName)) {
            return tables.get(tableName)!;
        }

        const table = new Map();
        tables.set(tableName, table);
        return table;
    }

    private wrap<T>(result: () => T | Promise<T>): Request<any, AWSError> {
        return {
            promise: async (): Promise<PromiseResult<any, AWSError>> => {
                return {
                    Item: await result(),
                    $response: undefined
                };
            }
        } as any;
    }

    private getEntity(tableName: string, id: string): Entity {
        const table = this.getTable(tableName);
        if (!table.has(id)) {
            throw new Error();
        }

        return table.get(id)!;
    }

    private setEntity(tableName: string, id: string, entity: Entity): void {
        const table = this.getTable(tableName);
        table.set(id, entity);
    }

    private unsetEntity(tableName: string, id: string): void {
        const table = this.getTable(tableName);
        if (!table.has(id)) {
            throw new Error();
        }

        table.delete(id);
    }
}