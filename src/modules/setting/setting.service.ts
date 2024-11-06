import { Inject, Injectable } from '@nestjs/common';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @Inject('SettingRepository')
    private readonly repository: typeof Setting,
  ) {}

  async create(createSettingInput: CreateSettingInput) {
    const exist = await this.repository.findOne({
      where: {
        belongId: createSettingInput.belongId,
      },
    });

    if (exist) {
      exist.set(createSettingInput);
      return exist.save();
    } else {
      return this.repository.create({ ...createSettingInput });
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

  async update(updateSettingInput: UpdateSettingInput) {
    const record = await this.repository.findByPk(updateSettingInput.id);
    if (!record) {
      throw new Error('Record not found');
    }
    record.set(updateSettingInput);
    return await record.save();
  }

  remove(id: string) {
    return this.repository.destroy({ where: { id } });
  }
}
