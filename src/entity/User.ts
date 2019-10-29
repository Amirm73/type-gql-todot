import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { Todo } from "./Todo";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", { length: 255, select: false })
  @Field({ nullable: true })
  name: string;
  // @Field({ nullable: true })
  // get title(): String {
  //   return this.name;
  // }

  // @Column("text", { unique: true })
  @Column("text")
  @Field({ nullable: true })
  email: string;

  @Column("varchar", { length: 255, select: false })
  @Field()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  @OneToMany(() => Todo, todo => todo.user, { cascade: true })
  todos: Todo[];

  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
