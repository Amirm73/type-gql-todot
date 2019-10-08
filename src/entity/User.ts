import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert
  // OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { IsEmailAlreadyExist } from "../modules/user/guards/isEmailAlreadyExist";
// import { Todo } from "./Todo";
@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", { length: 255 })
  @Field({ nullable: true })
  name: string;

  // @Column("text", { unique: true })
  @Column("text")
  @Field()
  @IsEmailAlreadyExist({ message: "The email i already in use!" })
  email: string;

  @Column("varchar", { length: 255 })
  @Field()
  password: string;

  // @OneToMany(() => Todo, () => Todo.user)
  // todos: Todo[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
