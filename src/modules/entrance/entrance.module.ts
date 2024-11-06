import { Module } from '@nestjs/common'
import { EntranceService } from './entrance.service'
import { EntranceResolver } from './entrance.resolver'

@Module({
  providers: [EntranceResolver, EntranceService]
})
export class EntranceModule {}
