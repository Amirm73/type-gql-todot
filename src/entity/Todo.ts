import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn
  // ManyToOne
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column("varchar", { length: 255 })
  @Field()
  name: string;

  @Column("varchar", { length: 255 })
  @Field()
  status: string;
}
