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
import { RoleEnum } from '../../../constants/enum/role.enum';

Table({ tableName: 'roles' });
@ObjectType()
export class Role extends Model {
  @Field(() => ID, { description: 'role id' })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => ID, { description: 'site id' })
  @Column({ field: 'site_id' })
  siteId?: string;

  @Field(() => ID)
  @Column({ field: 'user_id' })
  userId: string;

  @Field(() => String, { nullable: true })
  @Column({
    field: 'role_code',
    type: DataType.ENUM(...Object.values(RoleEnum)),
  })
  roleCode: string;

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
