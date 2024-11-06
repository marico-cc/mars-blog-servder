import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/user/user.module';
import { databaseProviders } from './modules/database/database.providers';
import { ConfigService } from './modules/shared/config/config.service';
import { ArticleModule } from './modules/article/article.module';
import { NodeModule } from './modules/node/node.module';
import { SiteModule } from './modules/site/site.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { GraphQLError } from 'graphql/error';
import { RoleModule } from './modules/role/role.module';
import { SettingModule } from './modules/setting/setting.module';
import { MediaModule } from './modules/media/media.module';
import { CustomizedFormModule } from './modules/customized-form/customized-form.module';
import { TagModule } from './modules/tag/tag.module';
import { TagArticleRelationshipModule } from './modules/tag-article-relitioanship/tag-article-relationship.module';

@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoTransformHttpErrors: false,
      formatError(error: GraphQLError) {
        return {
          message: JSON.stringify({
            code: error?.extensions?.code,
            message: error?.message,
          }),
          code: error?.extensions?.originalError,
        };
      },
    }),
    ConfigModule.forRoot(),
    UserModule,
    ArticleModule,
    NodeModule,
    SiteModule,
    AuthModule,
    FileModule,
    RoleModule,
    SettingModule,
    MediaModule,
    CustomizedFormModule,
    TagModule,
    TagArticleRelationshipModule,
  ],
  providers: [AppService, ConfigService, ...databaseProviders, SharedModule],
})
export class AppModule {
  constructor() {
    console.log(`NODE_ENV`, process.env.NODE_ENV);
  }
}
