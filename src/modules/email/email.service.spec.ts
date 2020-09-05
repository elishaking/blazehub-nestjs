import { Test, TestingModule } from '@nestjs/testing';

import { EmailService } from './email.service';
import { EmailModule } from './email.module';

describe('EmailService', () => {
  let service: EmailService;
  let module: TestingModule;

  afterAll(done =>
    module
      .close()
      .then(() => done())
      .catch(err => done(err)),
  );

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [EmailModule],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
