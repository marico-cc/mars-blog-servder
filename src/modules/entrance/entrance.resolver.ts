import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EntranceService } from './entrance.service';
import { Entrance } from './entities/entrance.entity';
import { CreateEntranceInput } from './dto/create-entrance.input';
import { UpdateEntranceInput } from './dto/update-entrance.input';

@Resolver(() => Entrance)
export class EntranceResolver {
  constructor(private readonly entranceService: EntranceService) {}

  @Mutation(() => Entrance)
  createEntrance(
    @Args('createEntranceInput') createEntranceInput: CreateEntranceInput,
  ) {
    return this.entranceService.create(createEntranceInput);
  }

  @Query(() => [Entrance], { name: 'entrance' })
  findAll() {
    return this.entranceService.findAll();
  }

  @Query(() => Entrance, { name: 'entrance' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.entranceService.findOne(id);
  }

  @Mutation(() => Entrance)
  updateEntrance(
    @Args('updateEntranceInput') updateEntranceInput: UpdateEntranceInput,
  ) {
    return this.entranceService.update(
      updateEntranceInput.id,
      updateEntranceInput,
    );
  }

  @Mutation(() => Entrance)
  removeEntrance(@Args('id', { type: () => Int }) id: number) {
    return this.entranceService.remove(id);
  }
}
