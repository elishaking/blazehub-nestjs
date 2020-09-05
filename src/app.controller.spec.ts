import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;
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

    appController = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getRoot()).toBe('Hello World!');
    });
  });
});
