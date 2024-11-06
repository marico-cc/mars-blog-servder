import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { TagArticleRelationship } from '../../tag-article-relitioanship/entities/tag-article-relationship.entity';
import { GraphQLJSON } from 'graphql-scalars';

@Table({ tableName: 'articles' })
@ObjectType()
export class Article extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => ID)
  @Column({ field: 'site_id', type: DataType.STRING })
  siteId: string;

  @Field(() => ID)
  @Column({ field: 'node_id', type: DataType.STRING })
  nodeId: string;

  @Field(() => ID, { nullable: true })
  @Column({ field: 'user_id', type: DataType.STRING })
  userId: string;

  @Field(() => String)
  @Column
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ field: 'is_private', type: DataType.ENUM('Y', 'N') })
  isPrivate: string;

  @Field(() => String)
  @Column({ type: DataType.TEXT('medium') })
  content: string;

  @Field(() => String, { nullable: true })
  @Column({ field: 'thumb_url' })
  thumbUrl?: string;

  @Field(() => [String], { nullable: true })
  @Column({ field: 'images', type: DataType.JSON })
  images?: Array<string>;

  @Field(() => String, { nullable: true })
  @Column
  author?: string;

  @Field(() => String, { nullable: true })
  @Column
  origin?: string;

  @Field(() => String, { nullable: true })
  @Column({ field: 'origin_url' })
  originUrl?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  @HasMany(() => TagArticleRelationship)
  tags?: Array<any>;

  @Field(() => Int, { nullable: true })
  @Column({ field: 'view_count' })
  viewCount?: number;

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
