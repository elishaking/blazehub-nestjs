import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import * as firebaseApp from 'firebase/app';
import { firebaseConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());

  firebaseApp.initializeApp(firebaseConfig);

  await app.listen(3000);
}
bootstrap();
