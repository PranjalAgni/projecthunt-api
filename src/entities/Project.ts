import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { HashTag } from "./HashTag";
import { Image } from "./Image";
import { User } from "./User";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  projectId: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 100
  })
  title: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 240
  })
  tagline: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 2000
  })
  description: string;

  @OneToMany(() => Image, (image) => image.project)
  @JoinColumn({ name: "images" })
  @Column("int", { array: true })
  images: Image[];

  @Column({
    type: "varchar",
    nullable: true
  })
  website: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  github: string;

  @Column({
    type: "varchar",
    nullable: true
  })
  youtube: string;

  @OneToMany(() => User, (user) => user.project)
  @JoinColumn({ name: "users" })
  @Column("int", { array: true })
  users: User[];

  @OneToMany(() => HashTag, (hashTag) => hashTag.project)
  @JoinColumn({ name: "tags" })
  @Column("int", { array: true })
  tags: HashTag[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  deletedAt: Date;
}
