import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Project } from "./Project";

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  imageId: number;

  @Column("varchar", { nullable: false })
  url: string;

  @ManyToOne(() => Project, (project) => project.images)
  project: Project;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  deletedAt: Date;
}
