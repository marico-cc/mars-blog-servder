import { Injectable } from '@nestjs/common'
import { CreateEntranceInput } from './dto/create-entrance.input'
import { UpdateEntranceInput } from './dto/update-entrance.input'

@Injectable()
export class EntranceService {
  create (createEntranceInput: CreateEntranceInput) {
    return 'This action adds a new entrance'
  }

  findAll () {
    return 'This action returns all entrance'
  }

  findOne (id: number) {
    return `This action returns a #${id} entrance`
  }

  update (id: number, updateEntranceInput: UpdateEntranceInput) {
    return `This action updates a #${id} entrance`
  }

  remove (id: number) {
    return `This action removes a #${id} entrance`
  }
}
