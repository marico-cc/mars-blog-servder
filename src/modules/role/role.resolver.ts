import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { CurrentUser } from '../../utils/user.decorator';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserInfo } from './dto/isSysAdmin.output';
import { IsSiteAdmin } from './dto/isSiteAdmin.output';
import { RoleEnum } from '../../constants/enum/role.enum';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'rolesOfSites', nullable: true })
  getRolesOfSites(
    @Args('siteIds', { type: () => [ID] }) siteIds: Array<string>,
  ) {
    return this.roleService.findRolesOfSites(siteIds);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => CurrentUserInfo, { name: 'currentRole' })
  async getCurrentUser(@CurrentUser() user: User): Promise<CurrentUserInfo> {
    const roles = await this.roleService.getUserRoles(user.id);
    const _user: CurrentUserInfo = user as CurrentUserInfo;
    _user.isSystemAdmin = !!roles.find(
      (el) => el.roleCode === RoleEnum.SYSTEM_ADMIN,
    );
    _user.isAdmin = !!roles.find((el) => el.roleCode === RoleEnum.ADMIN);
    _user.isSuperAdmin = !!roles.find(
      (el) => el.roleCode === RoleEnum.SUPER_ADMIN,
    );

    return _user;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => IsSiteAdmin, { name: 'isSiteAdmin' })
  async isSiteAdmin(
    @Args('siteId', { type: () => ID }) siteId: string,
    @CurrentUser() user: User,
  ): Promise<IsSiteAdmin> {
    const roles = (await this.roleService.isSiteAdmin(user.id, siteId)) || [];
    const roleCodes = roles.map((it) => it.roleCode);
    const isSiteAdmin = new IsSiteAdmin();
    isSiteAdmin.isSiteAdmin = roleCodes.includes(RoleEnum.ADMIN);
    isSiteAdmin.isSiteSuperAdmin = roleCodes.includes(RoleEnum.SUPER_ADMIN);
    return isSiteAdmin;
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: string) {
    return this.roleService.remove(id);
  }
}
