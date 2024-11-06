import { Inject, Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { QueryCommonDto } from '../../interfaces/QueryCommon';
import { QueryHelper } from '../../utils/queryHelper';
import { Op } from 'sequelize';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @Inject('TagRepository') private readonly repository: typeof Tag,
  ) {}
  create(input: CreateTagInput) {
    return this.repository.create({ ...input });
  }

  async bulkCreate(input: CreateTagInput[]) {
    const names = input.map((item) => item.name);
    const existingTags = await this.repository.findAll({
      where: { name: { [Op.in]: names } },
    });
    if (existingTags.length === input.length) return existingTags;

    const existingNames = existingTags.map((tag) => tag.name);
    const toAdd = input.filter((item) => {
      return !existingNames.includes(item.name);
    });

    const addedTags = await this.repository.bulkCreate(toAdd);

    return [...existingTags, ...addedTags];
  }

  count(keyword: string = '', commonQuery: QueryCommonDto) {
    const query = {
      where: { name: { [Op.like]: `%${keyword}%` } },
      ...QueryHelper.getQueryCommon(commonQuery),
    };
    return this.repository.count(query);
  }

  findAll(keyword: string = '', commonQuery: QueryCommonDto = {}) {
    const query = {
      where: {
        name: { [Op.like]: `%${keyword}%` },
      },
      ...QueryHelper.getQueryCommon(commonQuery),
    };
    return this.repository.findAll(query);
  }

  findOne(id: string) {
    return this.repository.findByPk(id);
  }

  update(updateTagInput: UpdateTagInput) {
    return this.repository.update(
      { name: updateTagInput.name },
      { where: { id: updateTagInput.id } },
    );
  }

  remove(id: string) {
    return this.repository.destroy({ where: { id } });
  }
}
