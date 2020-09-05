import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AppModule } from '../../app.module';

describe('Auth Controller', () => {
  let controller: AuthController;

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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
