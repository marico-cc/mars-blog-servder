import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { CreateMediaInput } from './dto/create-media.input';
import { UpdateMediaInput } from './dto/update-media.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Ordering } from '../../interfaces/QueryCommon';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Media)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediaService.create(createMediaInput);
  }

  @Query(() => Int, { name: 'mediaCount' })
  async getCount(
    @Args('nodeId', { type: () => ID }) nodeId: string,
    @Args('keyword', { type: () => String, nullable: true }) keyword: string,
  ): Promise<number> {
    return this.mediaService.getCount(nodeId, keyword);
  }

  @Query(() => [Media], { name: 'topMedia', nullable: true })
  getTopMedia(@Args('nodeId', { type: () => ID }) nodeId: string) {
    return this.mediaService.getTopMedia(nodeId);
  }

  @Query(() => [Media], { name: 'mediaList' })
  findAll(
    @Args('nodeId', { type: () => ID }) nodeId: string,
    @Args('keyword', { type: () => String, nullable: true }) keyword: string,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
    @Args('orderBy', { type: () => String, nullable: true }) orderBy: string,
    @Args('order', { type: () => String, nullable: true }) order: Ordering,
  ) {
    return this.mediaService.findAll(nodeId, keyword, {
      page,
      pageSize,
      orderBy,
      order,
    });
  }

  @Query(() => Media, { name: 'media' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.mediaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Media)
  updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
    return this.mediaService.update(updateMediaInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Media)
  removeMedia(@Args('id', { type: () => ID, nullable: true }) id: string) {
    return this.mediaService.remove(id);
  }
}
