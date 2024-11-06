import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { UserResolver } from './user.resolver';
import { UserProviders } from './user.provider';
import { CreateUserInput } from './dto/create-user.input';
import { GenderEnum } from '../../constants/enum/gender.enum';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule, DatabaseModule],
      controllers: [],
      providers: [UserService, UserProviders, UserResolver],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const data: CreateUserInput = {
      userName: 'marico',
      nickName: 'Marico',
      email: 'look@marico.cc',
      password: '123456',
      phone: '18660050334',
      gender: GenderEnum.MALE,
    };
    const user = await service.create(data);
    expect(user.id).toBeDefined();
  });
});
