import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Article } from '../../article/entities/article.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Table({ tableName: 'tag_article_relationship' })
@ObjectType()
export class TagArticleRelationship extends Model {
  @ForeignKey(() => Article)
  @PrimaryKey
  @Field(() => ID)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  articleId: string;

  @Field(() => [Article], { nullable: true })
  @BelongsTo(() => Article)
  articles: Article[];

  @Field(() => ID)
  @ForeignKey(() => Tag)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @Field(() => ID)
  tagId: string;

  @Field(() => [Tag], { nullable: true })
  @BelongsTo(() => Tag)
  tags: Tag[];

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
