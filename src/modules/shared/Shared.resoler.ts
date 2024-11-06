import { Query, Resolver } from '@nestjs/graphql';
import { NodeType } from '../../constants/enum/node-type.enum';

@Resolver(() => null)
export class SharedResolver {
  @Query(() => [[String, String]], { name: 'nodeTypes' })
  nodeTypes() {
    return Object.entries(NodeType);
  }
}
