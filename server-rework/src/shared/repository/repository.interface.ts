import Entity from './entity.model';
import Optional from "../utils/optional";

export default interface Repository<EntityLike extends Entity> {
    find(key: string): Promise<Optional<EntityLike>>;
    delete(key: string): Promise<void>;
    save(entity: EntityLike): Promise<EntityLike>;
    findBy<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<Optional<EntityLike>>

    findOrFail(key: string): Promise<EntityLike>;
    findByOrFail<Key extends keyof EntityLike>(field: Key, value: EntityLike[Key]): Promise<EntityLike>
}