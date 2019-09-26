import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column } from 'typeorm';
import { ListedJob } from './listed-job.model';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false, length: 50 })
    name: string;

    @ManyToOne(type => Category, category => category.children, { eager: true })
    parent?: Category;

    @OneToMany(type => Category, category => category.parent)
    children?: Category[];

    @OneToMany(type => ListedJob, listedJob => listedJob.category)
    listedJobs?: ListedJob[];
}