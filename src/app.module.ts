import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { conf } from './common/configs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ObjectivesModule } from './objectives/objectives.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${conf.db.host}:${conf.db.port}/${conf.db.mainName}`),
    AuthModule,
    UsersModule,
    ObjectivesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
