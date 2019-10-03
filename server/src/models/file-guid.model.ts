import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Job } from "./job.model";

@Entity()
export class FileGUID {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 36, nullable: false })
  guid: string;

  @ManyToOne(type => Job, job => job.pictureGUIDs)
  job: Job;
}