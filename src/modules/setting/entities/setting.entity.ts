import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { GraphQLJSON } from 'graphql-scalars';

Table({ tableName: 'settings' });
@ObjectType()
export class Setting extends Model {
  @Field(() => ID, { description: 'setting id' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => ID, { description: 'siteId, nodeId, etc... ' })
  @Column({ field: 'belong_id' })
  belongId: string;

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
