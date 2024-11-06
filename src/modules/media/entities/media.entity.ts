import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';
import { GraphQLJSON } from 'graphql-scalars';

@Table({ tableName: 'media' })
@ObjectType()
export class Media extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;
  @Field(() => ID, { nullable: true })
  @Column({ field: 'site_id' })
  siteId: string;

  @Field(() => ID)
  @Column({ field: 'node_id' })
  nodeId: string;

  @Field(() => String)
  @Column({ field: 'title' })
  title: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @Column({ field: 'media_list', type: DataType.JSON })
  mediaList: object;

  @Field(() => String, { nullable: true })
  @Column({ field: 'content', type: DataType.TEXT('medium') })
  content: string;

  @Field(() => String, { nullable: true })
  @Column({ field: 'thumb_url' })
  thumbUrl: string;

  @Field(() => Int, { nullable: true })
  @Column({ field: 'view_count' })
  viewCount?: number;

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
