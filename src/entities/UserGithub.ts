import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class UserGithub extends BaseEntity {
  @PrimaryGeneratedColumn()
  githubId: number;

  @Column()
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
