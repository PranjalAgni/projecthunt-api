import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable({
    name: "map_project_user",
    joinColumn: {
      name: "projectId",
      referencedColumnName: "projectId"
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "userId"
    }
  })
  users: User[];

  @OneToMany(() => HashTag, (hashTag) => hashTag.project)
  tags: HashTag[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  deletedAt: Date;
}
