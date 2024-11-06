import { Inject, Injectable } from '@nestjs/common';
import { CreateTagArticleRelationshipInput } from './dto/create-tag-article-relationship.input';
import { UpdateTagArticleRelationshipInput } from './dto/update-tag-article-relationship.input';
import { TagArticleRelationship } from './entities/tag-article-relationship.entity';
import { QueryCommonDto } from '../../interfaces/QueryCommon';
import { Op } from 'sequelize';

@Injectable()
export class TagArticleRelationshipService {
  constructor(
    @Inject('TagArticleRepository')
    private readonly repository: typeof TagArticleRelationship,
  ) {}

  create(createTagArticleRelationshipInput: CreateTagArticleRelationshipInput) {
    return 'This action adds a new tagArticleRelationship';
  }

  bulkCreate(input: CreateTagArticleRelationshipInput[]) {
    return this.repository.bulkCreate([...input] as Array<any>);
  }

  findAll(articleId: string = '', queryCommonDto: QueryCommonDto = {}) {
    return this.repository.findAll({
      where: { articleId },
      ...queryCommonDto,
    } as any);
  }

  findOne(id: number) {
    return `This action returns a #${id} tagArticleRelationship`;
  }

  update(
    id: number,
    updateTagArticleRelationshipInput: UpdateTagArticleRelationshipInput,
  ) {
    return `This action updates a #${id} tagArticleRelationship`;
  }

  remove(id: number) {
    return `This action removes a #${id} tagArticleRelationship`;
  }

  bulkRemove(ids: string[]) {
    return this.repository.destroy({
      where: {
        tagId: {
          [Op.in]: ids,
        },
      },
    });
  }
}
