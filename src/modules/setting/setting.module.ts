import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingResolver } from './setting.resolver';
import { SettingProvider } from './setting.provider';
import { SettingValuesService } from './settingValues.service';
import { SettingValuesProvider } from './settingValues.provider';
import { SettingValuesResolver } from './settingValues.resolver';

@Module({
  providers: [
    SettingResolver,
    SettingService,
    SettingProvider,
    SettingValuesResolver,
    SettingValuesService,
    SettingValuesProvider,
  ],
})
export class SettingModule {}
