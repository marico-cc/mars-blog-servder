import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OssUploadSignature {
  @Field(() => String)
  expire: string;

  @Field(() => String)
  policy: string;

  @Field(() => String)
  signature: string;

  @Field(() => String)
  accessId: string;

  @Field(() => String)
  host: string;

  @Field(() => String)
  callback: string;

  @Field(() => String)
  dir: string;
}
