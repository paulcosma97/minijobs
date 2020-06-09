import Entity from './entity.model';
import Optional from "../utils/optional";

export default interface Repository<EntityLike extends Entity> {
    findOne(key: string): Promise<Optional<EntityLike>>;
    deleteOne(key: string): Promise<void>;
    saveOne(entity: EntityLike): Promise<EntityLike>;
    findOneBy<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<Optional<EntityLike>>

    findOneOrFail(key: string): Promise<EntityLike>;
    findOneByOrFail<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<EntityLike>
}