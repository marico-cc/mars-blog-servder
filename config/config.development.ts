import { Dialect } from 'sequelize/types';

export const config = {
  // database: {
  //   dialect: 'mysql' as Dialect,
  //   host: 'localhost',
  //   port: 3306,
  //   username: 'blog_local',
  //   password: 'ABF2DfpbzfdR7yL8',
  //   database: 'blog_local',
  //   logging: console.log,
  // },

  jwtSecret: '40fdce46-6645-45bb-92dc-f92f165179d4',
  refresh_secret: 'db8c93c2-ff2c-44a8-b2f3-cf4c1e4adbb2',
  jwtExpiresIn: 60 * 5,
  refreshTokenExpiresIn: 60 * 60 * 24 * 7,

};
