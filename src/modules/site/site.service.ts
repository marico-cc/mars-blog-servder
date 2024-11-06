import { Injectable, Inject } from '@nestjs/common';
import { CreateSiteInput } from './dto/create-site.input';
import { UpdateSiteInput } from './dto/update-site.input';
import { Site } from './entities/site.entity';
import { CreateRoleInput } from '../role/dto/create-role.input';
import { RoleService } from '../role/role.service';
import { User } from '../user/entities/user.entity';
import { RoleEnum } from '../../constants/enum/role.enum';
import { Op } from 'sequelize';

@Injectable()
export class SiteService {
  constructor(
    @Inject('SiteRepository')
    private readonly repository: typeof Site,
    private readonly roleService: RoleService,
  ) {}

  create(createSiteInput: CreateSiteInput) {
    return this.repository.create({ ...createSiteInput });
  }

  async findAll(user: User): Promise<Array<Site>> {
    const userRoles = await this.roleService.getUserRoles(user.id);
    const isSystemAdmin = userRoles.some(
      (role) => role.roleCode === RoleEnum.SYSTEM_ADMIN,
    );
    if (isSystemAdmin) {
      return this.repository.findAll();
    }

    const adminSiteIds = userRoles
      .filter((role) => role.roleCode === RoleEnum.ADMIN)
      .map((role) => role.siteId);

    const superAdminSiteIds = userRoles
      .filter((role) => role.roleCode === RoleEnum.SUPER_ADMIN)
      .map((role) => role.siteId);

    const sites = await this.repository.findAll({
      where: {
        id: {
          [Op.in]: [...adminSiteIds, ...superAdminSiteIds],
        },
      },
    });

    return sites || [];
  }

  findOne(id: string): Promise<Site> {
    return this.repository.findByPk(id);
  }

  async update(updateSiteInput: UpdateSiteInput): Promise<Site> {
    const record = await this.repository.findByPk(updateSiteInput.id);
    record.set(updateSiteInput);
    return await record.save();
  }
  async remove(id: string): Promise<Site> {
    const record = await this.repository.findByPk(id);
    await record.destroy();
    return record;
  }

  async setRoles(roles, siteId, currentUserId) {
    const tasks = [];

    roles.forEach(({ userId, roleCode }) => {
      const createRoleInput = new CreateRoleInput();
      createRoleInput.siteId = siteId;
      createRoleInput.userId = userId;
      createRoleInput.roleCode = roleCode;
      createRoleInput.createdBy = currentUserId;

      tasks.push(this.roleService.create(createRoleInput));
    });

    await Promise.all(tasks);
  }

  async updateRoles(roles, siteId, currentUserId) {
    if (roles.admin) {
      await this.roleService.setSiteRole(
        siteId,
        roles.admin,
        RoleEnum.ADMIN,
        currentUserId,
      );
    }
    if (roles.superAdmin) {
      await this.roleService.setSiteRole(
        siteId,
        roles.superAdmin,
        RoleEnum.SUPER_ADMIN,
        currentUserId,
      );
    }
  }
}
