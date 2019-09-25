import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column } from 'typeorm';
import { Job } from './job.model';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false, length: 50 })
    name: string;

    @OneToMany(type => Category, category => category.children, { eager: true })
    parent?: Category;

    @ManyToOne(type => Category, category => category.parent)
    children?: Category[];

    @OneToMany(type => Job, job => job.category)
    jobs?: Job[];
}