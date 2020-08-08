import { Test, TestingModule } from '@nestjs/testing';
import { TokenUrlService } from './token-url.service';

describe('TokenUrlService', () => {
  let service: TokenUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenUrlService],
    }).compile();

    service = module.get<TokenUrlService>(TokenUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
