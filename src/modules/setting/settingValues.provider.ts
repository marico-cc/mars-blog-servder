import { SettingValues } from './entities/settingValues.entity';

export const SettingValuesProvider = {
  provide: 'SettingValuesRepository',
  useValue: SettingValues,
};
