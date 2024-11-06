import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { Article } from './entities/article.entity';
import { Op } from 'sequelize';
import { SavePageInput } from './dto/save-page-input';
import { QueryHelper } from '../../utils/queryHelper';
import { QueryCommonDto } from '../../interfaces/QueryCommon';
import { TagArticleRelationship } from '../tag-article-relitioanship/entities/tag-article-relationship.entity';
import { Tag } from '../tag/entities/tag.entity';
import { TagService } from '../tag/tag.service';
import { TagArticleRelationshipService } from '../tag-article-relitioanship/tag-article-relationship.service';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ArticleRepository') private readonly repository: typeof Article,
    private readonly tagService: TagService,
    private readonly tagArticleService: TagArticleRelationshipService,
  ) {}
  async create(createArticleInput: CreateArticleInput): Promise<Article> {
    const article = await this.repository.create({ ...createArticleInput });
    if (!createArticleInput.tags || createArticleInput.tags.length == 0)
      return article;

    const tags = await this.tagService.bulkCreate(createArticleInput.tags);
    const ships = (tags || []).map((item) => ({
      articleId: article.id,
      tagId: item.id,
    }));

    const _ships = await this.tagArticleService.bulkCreate(ships as Array<any>);
    await article.$add('tags', _ships as TagArticleRelationship[]);
    return article;
  }

  getCount(
    siteId: string,
    nodeId: string | Array<string>,
    keyword: string = '',
  ): Promise<number> {
    const options = {
      where: { siteId, title: { [Op.like]: `%${keyword}%` } },
    };

    if (Array.isArray(nodeId) && nodeId.length > 0) {
      options['where']['nodeId'] = { [Op.in]: nodeId };
    } else if (nodeId && typeof nodeId === 'string') {
      options['where']['nodeId'] = nodeId;
    }

    return this.repository.count(options);
  }

  async findAll(
    siteId: string,
    nodeId: string | Array<string>,
    keyword: string = '',
    isPrivate: string,
    queryCommonDto = {},
  ): Promise<Array<Article>> {
    const whereCondition = {
      siteId,
      title: { [Op.like]: `%${keyword}%` },
    };

    if (Array.isArray(nodeId) && nodeId.length > 0) {
      whereCondition['nodeId'] = { [Op.in]: nodeId };
    } else if (nodeId && typeof nodeId === 'string') {
      whereCondition['nodeId'] = nodeId;
    }

    if (isPrivate === 'Y') whereCondition['isPrivate'] = 'Y';

    const options = {
      where: whereCondition,
      ...QueryHelper.getQueryCommon(queryCommonDto as QueryCommonDto),
      include: [
        {
          model: TagArticleRelationship,
          attributes: ['tagId'],
          as: 'tags',
          include: [
            {
              model: Tag,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    };

    const records = await this.repository.findAll(options);

    return records.map((record) => {
      record.tags = record.tags?.map((item) => item.tags) || [];
      return record;
    });
  }

  getTopArticles(nodeId: string): Promise<Array<Article>> {
    return this.repository.findAll({
      where: { nodeId, thumbUrl: { [Op.not]: '' } },
      limit: 7,
    });
  }

  async findOne(id: string): Promise<Article> {
    const record = await this.repository.findByPk(id, {
      include: [
        {
          model: TagArticleRelationship,
          attributes: ['tagId'],
          as: 'tags',
          include: [
            {
              model: Tag,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    record.viewCount = (record.viewCount || 0) + 1;
    await record.save();
    record.tags = record.tags?.map((item) => item.tags) || [];
    return record;
  }
  async update(updateArticleInput: UpdateArticleInput): Promise<Article> {
    const record = await this.repository.findByPk(updateArticleInput.id);
    record.set(updateArticleInput);
    await record.save();

    const tags = updateArticleInput.tags || [];
    const tagIds = tags.map((item) => item.id);
    const existingTags = await this.tagArticleService.findAll(record.id);
    const existingTagIds = existingTags.map((item) => item.tagId);
    const toAdd = [];
    let toLinkIds = [];
    const toRemoveIds = existingTagIds.filter((item) => !tagIds.includes(item));

    const tasks = [];

    for (const tag of tags) {
      if (!tag.id) toAdd.push(tag);
      else if (!existingTagIds.includes(tag.id)) toLinkIds.push(tag.id);
    }

    if (toAdd.length > 0) {
      const newAddedTags = await this.tagService.bulkCreate(toAdd);
      const newlyAddedIds = newAddedTags.map((item) => item.dataValues.id);
      toLinkIds = toLinkIds.concat(newlyAddedIds);
    }

    if (toLinkIds.length > 0) {
      tasks.push(
        this.tagArticleService.bulkCreate(
          toLinkIds.map(
            (item) =>
              ({
                articleId: record.id,
                tagId: item,
              }) as any,
          ),
        ),
      );
    }

    if (toRemoveIds.length > 0) {
      tasks.push(this.tagArticleService.bulkRemove(toRemoveIds));
    }

    if (tasks.length > 0) await Promise.all(tasks);
    return record;
  }

  async remove(id: string): Promise<Article> {
    const record = await this.repository.findByPk(id);
    await record.destroy();
    return record;
  }

  findPage(nodeId: string): Promise<Article> {
    return this.repository.findOne({
      where: { nodeId: { [Op.eq]: nodeId } },
    });
  }

  async savePage(article: SavePageInput): Promise<Article> {
    const record = await this.findPage(article.nodeId);
    if (record) {
      record.set(article);
      return await record.save();
    }
    return this.repository.create({ ...article });
  }
}
