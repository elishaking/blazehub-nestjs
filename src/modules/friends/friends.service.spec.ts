import { Test, TestingModule } from '@nestjs/testing';

import { FriendsService } from './friends.service';
import { AppModule } from '../../app.module';

describe('FriendsService', () => {
  let service: FriendsService;
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

    service = module.get<FriendsService>(FriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
