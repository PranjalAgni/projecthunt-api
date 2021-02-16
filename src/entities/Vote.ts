import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  voteId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "user" })
  user: User;

  @OneToOne(() => Project)
  @JoinColumn({ name: "project" })
  project: Project;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  deletedAt: Date;
}
