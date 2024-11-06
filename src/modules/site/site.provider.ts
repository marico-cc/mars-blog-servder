import { Site } from './entities/site.entity';

export const SiteProvider = { provide: 'SiteRepository', useValue: Site };
