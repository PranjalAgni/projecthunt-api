import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  voteId: number;

  @Column({ type: "integer", nullable: false })
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: "project" })
  project: Project;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  deletedAt: Date;
}
