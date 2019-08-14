import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RabbitMQHelper } from './rabbitmq.helper';


async function bootstrap() {



  const app = await NestFactory.create(AppModule);
  const test = new RabbitMQHelper('	amqp://whgejucx:0m6v7Ad_jvVU-vazSeTkeMilTnTCfJqT@termite.rmq.cloudamqp.com/whgejucx', 'exchang1', 'queue1')

  // const options = new DocumentBuilder()
  //   .setTitle('User example')
  //   .setDescription('The user API description')
  //   .setVersion('1.0')
  //   .addTag('User')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  // const response = await test.subscribe();
  //console.log('Response: ', response);
}
bootstrap();
