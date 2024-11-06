import { Injectable } from '@nestjs/common';
import { CreateLogInput } from './dto/create-log.input';
import { UpdateLogInput } from './dto/update-log.input';

@Injectable()
export class LogService {
  create(createLogInput: CreateLogInput) {
    return 'This action adds a new log';
  }

  findAll() {
    return `This action returns all log`;
  }

  findOne(id: number) {
    return `This action returns a #${id} log`;
  }

  update(id: number, updateLogInput: UpdateLogInput) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
