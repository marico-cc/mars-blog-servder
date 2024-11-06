import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomizedFormInput } from './dto/create-customized-form.input';
import { UpdateCustomizedFormInput } from './dto/update-customized-form.input';
import { CustomizedForm } from './entities/customized-form.entity';
import { QueryHelper } from '../../utils/queryHelper';
import { QueryCommonDto } from '../../interfaces/QueryCommon';

@Injectable()
export class CustomizedFormService {
  constructor(
    @Inject('CustomizedFormRepository')
    private readonly repository: typeof CustomizedForm,
  ) {}
  create(createCustomizedFormInput: CreateCustomizedFormInput) {
    return this.repository.create({ ...createCustomizedFormInput });
  }

  getCount(nodeId: string): Promise<number> {
    const options = {
      where: { nodeId },
    };
    return this.repository.count(options);
  }

  findAll(nodeId: string, queryCommonDto = {}) {
    const options = {
      where: { nodeId },
      ...QueryHelper.getQueryCommon(queryCommonDto as QueryCommonDto),
    };
    return this.repository.findAll(options);
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(updateCustomizedFormInput: UpdateCustomizedFormInput) {
    const record = await this.repository.findByPk(updateCustomizedFormInput.id);
    if (!record) {
      throw new Error('Record not found');
    }
    record.set(updateCustomizedFormInput);
    return record.save();
  }

  async remove(id: string) {
    const record = await this.repository.findByPk(id);
    await record?.destroy();
    return record;
  }
}
