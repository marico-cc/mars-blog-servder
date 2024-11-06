import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SiteService } from './site.service';
import { Site } from './entities/site.entity';
import { CreateSiteInput } from './dto/create-site.input';
import { UpdateSiteInput } from './dto/update-site.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../utils/user.decorator';
import { User } from '../user/entities/user.entity';

import { RoleService } from '../role/role.service';
import { RoleEnum } from '../../constants/enum/role.enum';

@Resolver(() => Site)
export class SiteResolver {
  constructor(
    private readonly siteService: SiteService,
    private readonly roleService: RoleService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Site)
  async createSite(
    @Args('createSiteInput') createSiteInput: CreateSiteInput,
    @CurrentUser() user: User,
  ) {
    const site = await this.siteService.create(createSiteInput);

    const admin = createSiteInput.admin?.[0];
    const superAdmin = createSiteInput.superAdmin?.[0];

    if (admin || superAdmin) {
      await this.siteService.updateRoles(
        {
          admin,
          superAdmin,
        },
        site.id,
        user.id,
      );
    }
    return site;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Site], { name: 'sites' })
  findAll(@CurrentUser() user: User) {
    return this.siteService.findAll(user);
  }

  @Query(() => Site, { name: 'site' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.siteService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Site)
  async updateSite(
    @Args('updateSiteInput') updateSiteInput: UpdateSiteInput,
    @CurrentUser() user: User,
  ) {
    const site = await this.siteService.update(updateSiteInput);

    const admin = updateSiteInput.admin?.[0];
    const superAdmin = updateSiteInput.superAdmin?.[0];

    if (admin || superAdmin) {
      await this.siteService.updateRoles(
        {
          admin,
          superAdmin,
        },
        site.id,
        user.id,
      );
    }
    return site;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Site)
  removeSite(@Args('id', { type: () => ID }) id: string) {
    return this.siteService.remove(id);
  }
}
