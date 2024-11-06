import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { CustomizedFormService } from './customized-form.service';
import { CustomizedForm } from './entities/customized-form.entity';
import { CreateCustomizedFormInput } from './dto/create-customized-form.input';
import { UpdateCustomizedFormInput } from './dto/update-customized-form.input';
import { Ordering } from '../../interfaces/QueryCommon';

@Resolver(() => CustomizedForm)
export class CustomizedFormResolver {
  constructor(private readonly customizedFormService: CustomizedFormService) {}

  @Mutation(() => CustomizedForm)
  createCustomizedForm(
    @Args('createCustomizedFormInput')
    createCustomizedFormInput: CreateCustomizedFormInput,
  ) {
    return this.customizedFormService.create(createCustomizedFormInput);
  }

  @Query(() => Int, { name: 'customizedCount' })
  async getCount(
    @Args('nodeId', { type: () => ID }) nodeId: string,
  ): Promise<number> {
    return this.customizedFormService.getCount(nodeId);
  }

  @Query(() => [CustomizedForm], { name: 'customizedForms', nullable: true })
  findAll(
    @Args('nodeId', { type: () => ID }) nodeId: string,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
    @Args('orderBy', { type: () => String, nullable: true }) orderBy: string,
    @Args('order', { type: () => String, nullable: true }) order: Ordering,
  ) {
    return this.customizedFormService.findAll(nodeId, {
      page,
      pageSize,
      orderBy,
      order,
    });
  }

  @Query(() => CustomizedForm, { name: 'customizedForm' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.customizedFormService.findOne(id);
  }

  @Mutation(() => CustomizedForm)
  updateCustomizedForm(
    @Args('updateCustomizedFormInput')
    updateCustomizedFormInput: UpdateCustomizedFormInput,
  ) {
    return this.customizedFormService.update(updateCustomizedFormInput);
  }

  @Mutation(() => CustomizedForm, { nullable: true })
  removeCustomizedForm(@Args('id', { type: () => ID }) id: string) {
    return this.customizedFormService.remove(id);
  }
}
