import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import helmet from 'helmet';

//async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls:['amqp://guest:guest@rabbitmq:5672'],
  //     queue: 'books_queue',
  //     queueOptions: {
  //       durable: false
  //     }
    // }
  //})

  //await app.listen();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
      .setTitle('Gestion des associations')
      .setDescription('Description des APIs de la gestion des associations')
      .setVersion('1.0')
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
