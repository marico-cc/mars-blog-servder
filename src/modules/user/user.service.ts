import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { genSalt, hash } from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: typeof User,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const salt = await genSalt(10);
    const password = await hash(createUserInput.password, salt);
    return this.repository.create({ ...createUserInput, password });
  }

  findAll(userIds: Array<string>) {
    return this.repository.findAll({
      where: {
        id: {
          [Op.in]: userIds,
        },
      },
    });
  }
  searchUser(keyword: string) {
    return this.repository.findAll({
      where: {
        [Op.or]: [
          {
            userName: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            nickName: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    });
  }

  findOne(id: string): Promise<User> {
    return this.repository.findByPk(id);
  }

  findByUserName(userName: string): Promise<User> {
    return this.repository.findOne<User>({ where: { userName } });
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const user: any = { ...updateUserInput };
    if (updateUserInput?.password) {
      const salt = await genSalt(10);
      user.password = await hash(user.password, salt);
    }

    const record = await this.repository.findByPk(updateUserInput.id);
    record.set(user);
    return await record.save();
  }

  async remove(id: string): Promise<User> {
    const record = await this.repository.findByPk(id);
    await record.destroy();
    return record;
  }
}
