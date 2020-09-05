import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { AppModule } from '../../app.module';

describe('Users Controller', () => {
  let controller: UsersController;
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
