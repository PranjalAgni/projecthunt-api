import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
    nullable: true
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

  @ManyToMany(() => HashTag, (hashTag) => hashTag.project)
  @JoinTable({
    name: "map_project_hashtag",
    joinColumn: {
      name: "projectId",
      referencedColumnName: "projectId"
    },
    inverseJoinColumn: {
      name: "hashTagId",
      referencedColumnName: "hashTagId"
    }
  })
  tags: HashTag[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
