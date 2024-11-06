import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
import { NodeType } from '../../../constants/enum/node-type.enum';

Table({ tableName: 'nodes' });
@ObjectType()
export class Node extends Model {
  @Field(() => ID, { description: 'site id' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => ID, { nullable: true })
  @Column({ field: 'parent_id' })
  parentId?: string;

  @Field(() => String)
  @Column
  nodeName: string;

  @Field(() => String, { nullable: true })
  @Column({ field: 'uni_key' })
  uniKey: string;

  @Field(() => ID)
  @Column({ field: 'site_id' })
  siteId: string;

  @Field(() => String)
  @Column({
    type: DataType.ENUM(...Object.values(NodeType)),
  })
  type: string;

  @Field(() => Int, { nullable: true })
  @Column({ field: 'upload_max' })
  uploadMax?: number;

  @Field(() => Int, { nullable: true })
  @Column({ field: 'order', type: DataType.TINYINT })
  order?: number;

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
