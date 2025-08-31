import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RestaurantModule, MongooseModule.forRoot('mongodb://localhost/restaurant'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
