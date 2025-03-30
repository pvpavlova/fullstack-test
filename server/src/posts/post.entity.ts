import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  createdAt!: Date;

  @Column("simple-array")
  images!: string[];

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @Column()
  userId!: number;
}
