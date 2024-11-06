import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NodeService } from './node.service';
import { Node } from './entities/node.entity';
import { CreateNodeInput } from './dto/create-node.input';
import { UpdateNodeInput } from './dto/update-node.input';
import { NodeType } from '../../constants/enum/node-type.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Node)
export class NodeResolver {
  constructor(private readonly nodeService: NodeService) {}

  @Mutation(() => Node)
  createNode(@Args('createNodeInput') createNodeInput: CreateNodeInput) {
    return this.nodeService.create(createNodeInput);
  }

  @Query(() => [Node], { name: 'nodes' })
  findAll(@Args('siteId', { type: () => ID }) siteId: string) {
    return this.nodeService.findAll(siteId);
  }

  @Query(() => Node, { name: 'node' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.nodeService.findOne(id);
  }

  @Query(() => [[String, String]], { name: 'nodeTypes' })
  nodeTypes() {
    return Object.entries(NodeType);
  }

  @Mutation(() => Node)
  updateNode(@Args('updateNodeInput') updateNodeInput: UpdateNodeInput) {
    return this.nodeService.update(updateNodeInput);
  }

  @Mutation(() => Node)
  removeNode(@Args('id', { type: () => ID }) id: string) {
    return this.nodeService.remove(id);
  }
}
