import { Inject, Injectable } from '@nestjs/common';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { Media } from './entities/media.entity';
import { Op } from 'sequelize';
import { QueryHelper } from '../../utils/queryHelper';
import { QueryCommonDto } from '../../interfaces/QueryCommon';

@Injectable()
export class MediaService {
  constructor(
    @Inject('MediaRepository') private readonly repository: typeof Media,
  ) {}
  create(createMediaInput: CreateMediaInput) {
    return this.repository.create({ ...createMediaInput });
  }

  getCount(nodeId: string, keyword: string = ''): Promise<number> {
    const options = {
      where: { nodeId, title: { [Op.like]: `%${keyword}%` } },
    };
    return this.repository.count(options);
  }

  findAll(nodeId: string, keyword: string = '', queryCommonDto = {}) {
    const options = {
      where: { nodeId, title: { [Op.like]: `%${keyword}%` } },
      ...QueryHelper.getQueryCommon(queryCommonDto as QueryCommonDto),
    };

    return this.repository.findAll(options);
  }

  getTopMedia(nodeId: string): Promise<Array<Media>> {
    return this.repository.findAll({
      where: { nodeId, thumbUrl: { [Op.not]: '' } },
      limit: 7,
    });
  }

  async findOne(id: string) {
    const record = await this.repository.findByPk(id);
    record.viewCount = (record.viewCount || 0) + 1;
    await record.save();
    return record;
  }

  async update(updateMediaInput: UpdateMediaInput) {
    const record = await this.repository.findByPk(updateMediaInput.id);
    record.set(updateMediaInput);
    return await record.save();
  }

  async remove(id: string) {
    const record = await this.repository.findByPk(id);
    await record.destroy();
    return record;
  }
}
