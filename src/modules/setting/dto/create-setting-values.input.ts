import { InputType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateSettingValuesInput {
  @Field(() => ID, { description: 'siteId, nodeId, etc... ' })
  belongId: string;

  @Field(() => ID, { description: 'setting id' })
  settingId: string;

  @Field(() => GraphQLJSON, { description: 'values', nullable: true })
  values: object;
}
