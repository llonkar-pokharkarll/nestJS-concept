import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user.module';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [HttpModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0-xpub6.mongodb.net/microservice-demo?retryWrites=true&w=majority'),
    UserModule],
})
export class AppModule { }
