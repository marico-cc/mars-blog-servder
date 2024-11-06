import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SettingValues } from './entities/settingValues.entity';
import { SettingValuesService } from './settingValues.service';
import { CreateSettingValuesInput } from './dto/create-setting-values.input';
import { UpdateSettingValuesInput } from './dto/update-setting-values.input';

@Resolver(() => SettingValues)
export class SettingValuesResolver {
  constructor(private readonly service: SettingValuesService) {}

  @Mutation(() => SettingValues)
  createSettingValues(
    @Args('createSettingValuesInput')
    input: CreateSettingValuesInput,
  ) {
    return this.service.create(input);
  }

  @Query(() => [SettingValues], { name: 'allSettingValues' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => SettingValues, { name: 'settingValues', nullable: true })
  findOne(@Args('belongId', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => SettingValues)
  updateSettingValues(
    @Args('updateSettingValuesInput')
    input: UpdateSettingValuesInput,
  ) {
    return this.service.update(input);
  }

  @Mutation(() => SettingValues)
  removeSetting(@Args('id', { type: () => ID }) id: string) {
    return this.service.remove(id);
  }
}
