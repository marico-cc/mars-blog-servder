import { Injectable } from '@nestjs/common';
import { config as configDev } from '../../../../config/config.development';
import { config as configSit } from '../../../../config/config.sit';
import { config as configProd } from '../../../../config/config.production';

@Injectable()
export class ConfigService {
  config: any;
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.config = configProd;
    } else if (process.env.NODE_ENV === 'sit') {
      this.config = configSit;
    } else {
      this.config = configDev;
    }
  }
  get sequelizeOrmConfig() {
    return this.config.database;
  }

  get jwtSecret() {
    return this.config.jwtSecret;
  }

  get refresh_secret() {
    return this.config.refresh_secret;
  }

  get jwtExpiresIn() {
    return this.config.jwtExpiresIn;
  }

  get refreshTokenExpiresIn() {
    return this.config.refreshTokenExpiresIn;
  }

  get ossConfig() {
    return this.config.alioss;
  }
}
