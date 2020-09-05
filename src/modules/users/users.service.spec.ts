import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { AppModule } from '../../app.module';

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;

  afterAll(done =>
    module
      .close()
      .then(() => done())
      .catch(err => done(err)),
  );

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
