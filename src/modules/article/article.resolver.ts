import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { SavePageInput } from './dto/save-page-input';
import { Ordering } from '../../interfaces/QueryCommon';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articleService.create(createArticleInput);
  }

  @Query(() => Int, { name: 'articleCount' })
  async getCount(
    @Args('siteId', { type: () => ID }) siteId: string,
    @Args('nodeId', { type: () => ID }) nodeId: string,
    @Args('keyword', { type: () => String, nullable: true }) keyword: string,
  ): Promise<number> {
    return this.articleService.getCount(siteId, nodeId, keyword);
  }

  @Query(() => Int, { name: 'articleCountByIds' })
  async getCountByIds(
    @Args('siteId', { type: () => ID }) siteId: string,
    @Args('nodeId', { type: () => [ID] }) nodeId: string[],
    @Args('keyword', { type: () => String, nullable: true }) keyword: string,
  ): Promise<number> {
    return this.articleService.getCount(siteId, nodeId, keyword);
  }

  @Query(() => [Article], { name: 'articles' })
  findAll(
    @Args('siteId', { type: () => ID }) siteId: string,
    @Args('nodeId', { type: () => ID }) nodeId: string,
    @Args('keyword', { type: () => String, nullable: true }) keyword: string,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
    @Args('orderBy', { type: () => String, nullable: true }) orderBy: string,
    @Args('order', { type: () => String, nullable: true }) order: Ordering,
    @Args('isPrivate', { type: () => String, nullable: true })
    isPrivate: string,
  ) {
    return this.articleService.findAll(siteId, nodeId, keyword, isPrivate, {
      page,
      pageSize,
      orderBy,
      order,
    });
  }

  @Query(() => [Article], { name: 'articlesByIds' })
  findAllByIds(
    @Args('siteId', { type: () => ID }) siteId: string,
    @Args('nodeId', { type: () => [ID] }) nodeId: string[],
    @Args('keyword', { type: () => String, nullable: true }) keyword: string,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
    @Args('orderBy', { type: () => String, nullable: true }) orderBy: string,
    @Args('order', { type: () => String, nullable: true }) order: Ordering,
    @Args('isPrivate', { type: () => String, nullable: true })
    isPrivate: string,
  ) {
    return this.articleService.findAll(siteId, nodeId, keyword, isPrivate, {
      page,
      pageSize,
      orderBy,
      order,
    });
  }

  @Query(() => [Article], { name: 'allArticles' })
  findAllArticles(
    @Args('siteId', { type: () => ID }) siteId: string,
    @Args('keyword', { type: () => String, nullable: true }) keyword: string,
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
    @Args('orderBy', { type: () => String, nullable: true }) orderBy: string,
    @Args('order', { type: () => String, nullable: true }) order: Ordering,
  ) {
    return this.articleService.findAll(siteId, undefined, keyword, 'N', {
      page,
      pageSize,
      orderBy,
      order,
    });
  }

  @Query(() => [Article], { name: 'topArticles', nullable: true })
  getTopArticles(@Args('nodeId', { type: () => ID }) nodeId: string) {
    return this.articleService.getTopArticles(nodeId);
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.articleService.findOne(id);
  }

  @Mutation(() => Article)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(updateArticleInput);
  }

  @Query(() => Article, { name: 'page', nullable: true })
  findPage(@Args('nodeId', { type: () => ID }) nodeId: string) {
    return this.articleService.findPage(nodeId);
  }

  @Mutation(() => Article)
  savePage(@Args('savePageInput') page: SavePageInput) {
    return this.articleService.savePage(page);
  }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => ID }) id: string) {
    return this.articleService.remove(id);
  }
}
