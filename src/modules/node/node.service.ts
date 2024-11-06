import { Inject, Injectable } from '@nestjs/common';
import { CreateNodeInput } from './dto/create-node.input';
import { UpdateNodeInput } from './dto/update-node.input';
import { Node } from './entities/node.entity';

@Injectable()
export class NodeService {
  constructor(
    @Inject('NodeRepository')
    private readonly repository: typeof Node,
  ) {}
  create(createNodeInput: CreateNodeInput) {
    return this.repository.create({ ...createNodeInput });
  }

  findAll(siteId: string) {
    // TODO: add filter
    return this.repository.findAll({
      where: { siteId },
      order: [
        ['order', 'ASC'],
        ['createdAt', 'ASC'],
      ],
    });
  }

  findOne(id: string): Promise<Node> {
    return this.repository.findByPk(id);
  }

  async update(updateNodeInput: UpdateNodeInput): Promise<Node> {
    const record = await this.repository.findByPk(updateNodeInput.id);
    record.set(updateNodeInput);
    return await record.save();
  }
  async remove(id: string): Promise<Node> {
    const record = await this.repository.findByPk(id);
    await record.destroy();
    return record;
  }
}
