import { ManyToOne, Column, ChildEntity } from 'typeorm';
import { User } from './user.model';
import { Job } from './job.model';


@ChildEntity()
export class RequiredJob extends Job {
  @ManyToOne(type => User, user => user.requiredJobs)
  user: User;
}