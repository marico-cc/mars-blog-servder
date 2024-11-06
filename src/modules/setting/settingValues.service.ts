import { Inject, Injectable } from '@nestjs/common';
import { SettingValues } from './entities/settingValues.entity';
import { CreateSettingValuesInput } from './dto/create-setting-values.input';
import { UpdateSettingValuesInput } from './dto/update-setting-values.input';

@Injectable()
export class SettingValuesService {
  constructor(
    @Inject('SettingValuesRepository')
    private readonly repository: typeof SettingValues,
  ) {}

  async create(createSettingValuesInput: CreateSettingValuesInput) {
    const exist = await this.repository.findOne({
      where: {
        belongId: createSettingValuesInput.belongId,
      },
    });

    if (exist) {
      exist.set(createSettingValuesInput);
      return exist.save();
    } else {
      return this.repository.create({ ...createSettingValuesInput });
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(belongId: string) {
    return this.repository.findOne({
      where: {
        belongId,
      },
    });
  }

  async update(updateSettingValuesInput: UpdateSettingValuesInput) {
    const record = await this.repository.findByPk(updateSettingValuesInput.id);
    record.set(updateSettingValuesInput);
    return await record.save();
  }

  remove(id: string) {
    return `This action removes a #${id} setting`;
  }
}
