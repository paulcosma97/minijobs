import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class JobPackage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, length: 500 })
  description: string;
}