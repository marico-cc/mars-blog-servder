import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagArticleRelationship } from './entities/tag-article-relationship.entity';
import { TagArticleRelationshipService } from './tag-article-relationship.service';
import { CreateTagArticleRelationshipInput } from './dto/create-tag-article-relationship.input';
import { UpdateTagArticleRelationshipInput } from './dto/update-tag-article-relationship.input';

@Resolver(() => TagArticleRelationship)
export class TagArticleRelationshipResolver {
  constructor(
    private readonly tagArticleRelationshipService: TagArticleRelationshipService,
  ) {}

  @Mutation(() => TagArticleRelationship)
  createTagArticleRelationship(
    @Args('createRelationshipInput')
    createTagArticleRelationshipInput: CreateTagArticleRelationshipInput,
  ) {
    return this.tagArticleRelationshipService.create(
      createTagArticleRelationshipInput,
    );
  }

  @Query(() => [TagArticleRelationship], { name: 'tagArticleRelationships' })
  findAll() {
    return this.tagArticleRelationshipService.findAll();
  }

  @Query(() => TagArticleRelationship, { name: 'tagArticleRelationship' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tagArticleRelationshipService.findOne(id);
  }

  @Mutation(() => TagArticleRelationship)
  updateTagArticleRelationship(
    @Args('updateTagArticleRelationshipInput')
    updateTagArticleRelationshipInput: UpdateTagArticleRelationshipInput,
  ) {
    return this.tagArticleRelationshipService.update(
      updateTagArticleRelationshipInput.id,
      updateTagArticleRelationshipInput,
    );
  }

  @Mutation(() => TagArticleRelationship)
  removeTagArticleRelationship(@Args('id', { type: () => Int }) id: number) {
    return this.tagArticleRelationshipService.remove(id);
  }
}
