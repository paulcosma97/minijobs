import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from './user.model'

@Entity()
export class UserRating {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(type => User, user => user.ratings)
  user: User;

  @ManyToOne(type => User, user => user.ownRatings)
  ratedBy: User;

  @Column({ nullable: false, type: 'float' })
  rating: number
}