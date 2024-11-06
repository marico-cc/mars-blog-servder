import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateSettingValuesInput } from './create-setting-values.input';

@InputType()
export class UpdateSettingValuesInput extends PartialType(
  CreateSettingValuesInput,
) {
  @Field(() => ID)
  id: string;
}
