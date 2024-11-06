import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '../shared/config/config.service';
import { Article } from '../article/entities/article.entity';
import { File } from '../file/entities/file.entity';
import { Node } from '../node/entities/node.entity';
import { Site } from '../site/entities/site.entity';
import { Role } from '../role/entities/role.entity';
import { Setting } from '../setting/entities/setting.entity';
import { SettingValues } from '../setting/entities/settingValues.entity';
import { Media } from '../media/entities/media.entity';
import { CustomizedForm } from '../customized-form/entities/customized-form.entity';
import { Tag } from '../tag/entities/tag.entity';
import { TagArticleRelationship } from '../tag-article-relitioanship/entities/tag-article-relationship.entity';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([
        User,
        Article,
        File,
        Node,
        Site,
        Role,
        Setting,
        SettingValues,
        Media,
        CustomizedForm,
        Tag,
        TagArticleRelationship,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
