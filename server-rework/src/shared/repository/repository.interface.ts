export default interface Repository<Entity, Key> {
    find(key: Key): Promise<Entity>;
    delete(key: Key): Promise<void>;
    save(entity: Entity): Promise<Entity>;
}