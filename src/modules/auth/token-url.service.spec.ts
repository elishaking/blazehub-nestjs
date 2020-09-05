import { Test, TestingModule } from '@nestjs/testing';

import { TokenUrlService } from './token-url.service';
import { AppModule } from '../../app.module';

describe('TokenUrlService', () => {
  let service: TokenUrlService;
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

    service = module.get<TokenUrlService>(TokenUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
