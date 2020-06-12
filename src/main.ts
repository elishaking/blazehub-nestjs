import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import * as firebaseApp from 'firebase/app';
import { variables, firebaseConfig } from './app/config';

async function bootstrap() {
  firebaseApp.initializeApp(firebaseConfig);

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  if (variables.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: 'https://blazehub.skyblazar.com/',
    });
  }

  await app.listen(3000);
}
bootstrap();
