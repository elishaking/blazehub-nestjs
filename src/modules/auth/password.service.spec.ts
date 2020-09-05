import { Test, TestingModule } from '@nestjs/testing';

import { PasswordService } from './password.service';
import { AppModule } from '../../app.module';

describe('PasswordService', () => {
  let service: PasswordService;
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

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
