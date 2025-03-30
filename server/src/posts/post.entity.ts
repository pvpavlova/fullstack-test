import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column("simple-array", { nullable: true })
  images: string[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;
}
