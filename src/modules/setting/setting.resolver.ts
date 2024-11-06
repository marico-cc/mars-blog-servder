import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SettingService } from './setting.service';
import { Setting } from './entities/setting.entity';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { AllowNull } from 'sequelize-typescript';

@Resolver(() => Setting)
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  @Mutation(() => Setting)
  createSetting(
    @Args('createSettingInput') createSettingInput: CreateSettingInput,
  ) {
    return this.settingService.create(createSettingInput);
  }

  @Query(() => [Setting], { name: 'settings' })
  findAll() {
    return this.settingService.findAll();
  }

  @Query(() => Setting, { name: 'setting', nullable: true })
  findOne(@Args('belongId', { type: () => ID }) belongId: string) {
    return this.settingService.findOne(belongId);
  }

  @Mutation(() => Setting)
  updateSetting(
    @Args('updateSettingInput') updateSettingInput: UpdateSettingInput,
  ) {
    return this.settingService.update(updateSettingInput);
  }

  @Mutation(() => Setting)
  removeSetting(@Args('id', { type: () => ID }) id: string) {
    return this.settingService.remove(id);
  }
}
