import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as firebaseAdmin from 'firebase-admin';
import { promises as fsPromises } from 'fs';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Firebase Functions')
    .setDescription('Integrating Firebase Functions')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Firebase
  const firebaseKeyFilePath =
    './club-online-live-firebase-adminsdk-fbsvc-82710c6576.json';

  try {
    const firebaseServiceAccountContent = await fsPromises.readFile(
      firebaseKeyFilePath,
      'utf-8',
    );
    const firebaseServiceAccount = JSON.parse(
      firebaseServiceAccountContent,
    ) as firebaseAdmin.ServiceAccount;

    if (firebaseAdmin.apps.length === 0) {
      console.log('Initialize Firebase Application');
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
      });
    }
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
