import { PrimaryKey } from "./schema.utils";

export default interface Entity<Key> {
    id: PrimaryKey<Key>;
}