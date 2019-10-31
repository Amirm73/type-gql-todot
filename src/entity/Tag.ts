import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Todo } from "./Todo";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", { length: 255 })
  @Field()
  desc: string;

  @ManyToMany(() => Todo, todo => todo.tags)
  todos: Todo[];
}
