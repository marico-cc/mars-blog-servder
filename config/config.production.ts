import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'mysql' as Dialect,
    host: '172.20.87.202',
    port: 3306,
    username: 'cms-prod',
    password: '8CpE4HA62Cds86NT',
    database: 'cms-prod',
  },
  jwtSecret: '2d4d64d1-88ec-41d1-98e8-93e1e4010691',
  refresh_secret: 'eaee27e8-0fd2-41a9-b93e-351dc01d9a9c',
  jwtExpiresIn: 1000000,

};
