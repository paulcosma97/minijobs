import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany } from 'typeorm';
import { Category } from './category.model';
import { User } from './user.model';
import { File } from './file.model';

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => Category, category => category.jobs, { eager: true })
    category: Category;

    @Column({ nullable: false, length: 150 })
    name: string;

    @Column({ nullable: false, length: 1500 })
    description: string;

    @ManyToOne(type => User, user => user.jobs)
    user: User;

    @OneToMany(type => File, file => file.job)
    pictures: File[];

    @ManyToMany(type => User, user => user.lastViewed)
    lastViewedBy: User[];

    @Column({ default: 0, type: 'float' })
    computedRating?: number;
}