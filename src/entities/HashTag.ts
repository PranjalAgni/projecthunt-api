import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Project } from "./Project";

@Entity()
export class HashTag extends BaseEntity {
  @PrimaryGeneratedColumn()
  hashTagId: number;

  @Column({
    type: "varchar",
    length: 25,
    nullable: false
  })
  tag: string;

  @ManyToMany(() => Project, (project) => project.tags)
  project: Project;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
