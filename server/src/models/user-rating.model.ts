import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from './user.model'

@Entity()
export class UserRating {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(type => User, user => user.ratings)
  user: User;

  @Column({ nullable: false })
  rating: number
}