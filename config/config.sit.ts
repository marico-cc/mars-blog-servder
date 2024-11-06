import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'mysql' as Dialect,
    host: '172.20.87.202',
    port: 3306,
    username: 'cms_sit',
    password: 'iap6kE6w2BEdhi7k',
    database: 'cms_sit',
  },
  jwtSecret: '144c36ad-68ee-43a8-a252-3ad2eb635baa',
  refresh_secret: '4b5ee05f-71ce-42a5-8d73-aad9744167ca',
  jwtExpiresIn: 1000000,

};
