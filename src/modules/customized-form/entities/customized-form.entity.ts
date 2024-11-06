import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  PrimaryKey,
  UpdatedAt,
  Model,
  Table,
} from 'sequelize-typescript';
import { GraphQLJSON } from 'graphql-scalars';

@Table({ tableName: 'customized_form' })
@ObjectType()
export class CustomizedForm extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => String)
  @Column({ field: 'site_id' })
  siteId: string;

  @Field(() => String)
  @Column({ field: 'node_id' })
  nodeId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ field: 'values', type: DataType.JSON })
  values: object;

  @Field({ nullable: true })
  @Column({ field: 'created_by' })
  createdBy: string;

  @Field({ nullable: true })
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Field({ nullable: true })
  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
