import {
  DeleteDateColumn,
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class AuthToken extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  sessionId: string;

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
