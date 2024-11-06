import { Role } from './entities/role.entity';

export const RoleProvider = { provide: 'RoleRepository', useValue: Role };
