import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Job } from "./job.model";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  path: string;

  @ManyToOne(type => Job, job => job.pictures)
  job: Job;
}