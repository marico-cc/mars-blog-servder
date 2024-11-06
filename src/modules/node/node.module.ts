import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeResolver } from './node.resolver';
import { Node } from './entities/node.entity';

@Module({
  providers: [
    NodeResolver,
    NodeService,
    { provide: 'NodeRepository', useValue: Node },
  ],
})
export class NodeModule {}
