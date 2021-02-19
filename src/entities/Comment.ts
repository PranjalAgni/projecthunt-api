import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  commentId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user" })
  @Column({ nullable: false })
  user: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "project" })
  @Column({ nullable: false })
  project: Project;

  @Column({ type: "varchar", length: 50, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 1000, nullable: false })
  body: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
