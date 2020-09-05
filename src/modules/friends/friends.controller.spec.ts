import { Test, TestingModule } from '@nestjs/testing';

import { FriendsController } from './friends.controller';
import { AppModule } from '../../app.module';

describe('Friends Controller', () => {
  let controller: FriendsController;
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

    controller = module.get<FriendsController>(FriendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
