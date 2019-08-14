import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user.module';
import { UserSchema } from './schema/user.schema';
import { RabbitMQModule } from './module/rabbitmq.module';

@Module({
  imports: [HttpModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0-xpub6.mongodb.net/microservice-demo?retryWrites=true&w=majority',
      { useNewUrlParser: true }),
    UserModule],
})
export class AppModule { }
