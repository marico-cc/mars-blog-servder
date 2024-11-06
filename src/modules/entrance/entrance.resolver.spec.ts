import { Test, TestingModule } from '@nestjs/testing'
import { EntranceResolver } from './entrance.resolver'
import { EntranceService } from './entrance.service'

describe('EntranceResolver', () => {
  let resolver: EntranceResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntranceResolver, EntranceService]
    }).compile()

    resolver = module.get<EntranceResolver>(EntranceResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
