import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { AppModule } from '../../app.module';

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
