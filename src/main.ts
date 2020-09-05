import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import { variables } from './app/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  if (variables.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: variables.FRONTEND_URL,
    });
  }
  app.useGlobalPipes(
    new ValidationPipe({
      // forbidNonWhitelisted: true,
      // forbidUnknownValues: true,
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  await app.listen(variables.PORT || 8000);
}
bootstrap();
