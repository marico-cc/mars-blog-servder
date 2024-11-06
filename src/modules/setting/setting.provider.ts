import { Setting } from './entities/setting.entity';

export const SettingProvider = {
  provide: 'SettingRepository',
  useValue: Setting,
};
