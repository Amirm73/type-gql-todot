import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Tag } from "./Tag";
import { Type } from "../modules/todo/enums/todoTypes";

@Entity()
@ObjectType()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", { length: 255, nullable: true })
  @Field()
  name: String;

  @Column("varchar", { length: 255, nullable: true })
  @Field(() => Type)
  type: Type;

  @ManyToOne(() => User, user => user.todos)
  user: User;

  @ManyToMany(() => Tag, tag => tag.todos)
  @JoinTable()
  tags: Tag[];
}
