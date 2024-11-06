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

@Table({ tableName: 'files' })
@ObjectType()
export class File extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => String)
  @Column({ field: 'file_name' })
  fileName: string;

  @Field(() => String)
  @Column({ field: 'file_mime' })
  fileMime: string;

  @Field(() => String)
  @Column({ field: 'file_type' })
  fileType: string;

  @Field(() => String)
  @Column({ field: 'file_path' })
  filePath: string;

  @Field(() => Number, { nullable: true })
  @Column({ field: 'file_size' })
  fileSize?: number;

  @Field(() => ID, { nullable: true })
  @Column({ field: 'site_id' })
  siteId: string;

  @Field(() => ID, { nullable: true })
  @Column({ field: 'query_count', defaultValue: 0 })
  queryCount: number;

  @Field(() => ID, { nullable: true })
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
