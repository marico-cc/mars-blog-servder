import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LogService } from './log.service';
import { Log } from './entities/log.entity';
import { CreateLogInput } from './dto/create-log.input';
import { UpdateLogInput } from './dto/update-log.input';

@Resolver(() => Log)
export class LogResolver {
  constructor(private readonly logService: LogService) {}

  @Mutation(() => Log)
  createLog(@Args('createLogInput') createLogInput: CreateLogInput) {
    return this.logService.create(createLogInput);
  }

  @Query(() => [Log], { name: 'log' })
  findAll() {
    return this.logService.findAll();
  }

  @Query(() => Log, { name: 'log' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.logService.findOne(id);
  }

  @Mutation(() => Log)
  updateLog(@Args('updateLogInput') updateLogInput: UpdateLogInput) {
    return this.logService.update(updateLogInput.id, updateLogInput);
  }

  @Mutation(() => Log)
  removeLog(@Args('id', { type: () => Int }) id: number) {
    return this.logService.remove(id);
  }
}
