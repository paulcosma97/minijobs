import { ManyToOne, Column, ChildEntity, OneToMany } from 'typeorm';
import { User } from './user.model';
import { Job } from './job.model';
import { ListedJobPackage } from './listed-job-package.model';


@ChildEntity()
export class ListedJob extends Job {
  @ManyToOne(type => User, user => user.listedJobs)
  user: User;

  @Column({ default: 0, type: 'float' })
  computedRating?: number;

  @OneToMany(type => ListedJobPackage, pkg => pkg.listedJob)
  packages?: ListedJobPackage[];
}