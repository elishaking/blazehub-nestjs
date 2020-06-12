import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import * as firebaseApp from 'firebase/app';
import { firebaseConfig } from './app/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: 'https://blazehub.skyblazar.com/',
    });
  }

  firebaseApp.initializeApp(firebaseConfig);

  await app.listen(3000);
}
bootstrap();
