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

@Entity()
@ObjectType()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", { length: 255 })
  @Field()
  name: String;

  @Column("varchar", { length: 255 })
  @Field()
  type: string;

  @ManyToOne(() => User, user => user.todos)
  user: User;

  @ManyToMany(() => Tag, tag => tag.todos)
  @JoinTable()
  tags: Tag[];
}
