import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ListedJob } from './listed-job.model';

@Entity()
export class ListedJobPackage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, length: 500 })
  description: string;

  @ManyToOne(type => ListedJob, listedJob => listedJob.packages)
  listedJob: ListedJob;
}