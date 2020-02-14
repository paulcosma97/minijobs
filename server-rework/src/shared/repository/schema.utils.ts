import Entity from './entity.model';

export type PrimaryKey<Type> = Type;
export type ForeignKey<ExtendedEntity> = ExtendedEntity extends Entity<infer Type> ? Type : never;