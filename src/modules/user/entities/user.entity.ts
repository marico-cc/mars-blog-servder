import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Column,
  Model,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
} from 'sequelize-typescript';
import { GenderEnum } from '../../../constants/enum/gender.enum';

@Table({ tableName: 'users' })
@ObjectType()
export class User extends Model {
  @Field(() => ID, { description: 'PrimaryKey', nullable: true })
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field()
  @Unique
  @Column({ field: 'user_name' })
  userName: string;

  @Field({ nullable: true })
  @Column({ type: DataType.STRING })
  email?: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Field()
  @Column({ field: 'nick_name', type: DataType.STRING })
  nickName: string;

  @Field({ nullable: true })
  @Column({ field: 'phone', type: DataType.STRING })
  phone?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: DataType.ENUM(GenderEnum.FEMALE, GenderEnum.MALE) })
  gender: GenderEnum;

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
