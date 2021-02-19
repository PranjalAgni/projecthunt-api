import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
@Unique("user_project_index", ["user", "project"])
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

  @DeleteDateColumn()
  deletedAt: Date;
}
