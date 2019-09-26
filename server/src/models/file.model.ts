import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ListedJob } from "./listed-job.model";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  path: string;

  @ManyToOne(type => ListedJob, listedJob => listedJob.pictures)
  listedJob: ListedJob;
}