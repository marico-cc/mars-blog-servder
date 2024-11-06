import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Op } from 'sequelize';
import { RoleEnum } from '../../constants/enum/role.enum';
@Injectable()
export class RoleService {
  constructor(
    @Inject('RoleRepository')
    private readonly repository: typeof Role,
  ) {}
  create(createRoleInput: CreateRoleInput) {
    return this.repository.create({ ...createRoleInput });
  }

  getUserRoles(userId: string) {
    return this.repository.findAll({ where: { userId } });
  }

  isSiteAdmin(userId: string, siteId: string) {
    return this.repository.findAll({
      where: {
        userId,
        siteId,
      },
    });
  }

  async setSiteRole(
    siteId: string,
    userId: string,
    roleCode: RoleEnum,
    currentUserId: string,
  ) {
    const role = await this.repository.findOne({
      where: {
        siteId,
        roleCode,
      },
    });
    if (role) {
      role.userId = userId;
      role.updatedAt = new Date();
      await role.save();
      return role;
    } else {
      return await this.repository.create({
        siteId,
        userId,
        roleCode,
        createdBy: currentUserId,
      });
    }
  }

  findRolesOfSites(siteIds: Array<string>): Promise<Array<Role>> {
    return this.repository.findAll({
      where: {
        siteId: {
          [Op.in]: siteIds,
        },
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  async update(updateRoleInput: UpdateRoleInput) {
    const record = await this.repository.findByPk(updateRoleInput.id);
    record.set(updateRoleInput);
    return await record.save();
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
