import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BelongsToMany,
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

@Table({ tableName: 'tags' })
@ObjectType()
export class Tag extends Model<Tag> {
  @Field(() => ID, { description: 'ID' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => String, { description: 'name' })
  @Column({ type: DataType.CHAR(255) })
  name: string;

  @HasMany(() => TagArticleRelationship)
  tagArticle: TagArticleRelationship[];

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
