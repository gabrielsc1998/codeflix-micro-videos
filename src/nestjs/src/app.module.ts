import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ShareModule } from './@share/@share.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    CategoriesModule,
    DatabaseModule,
    ShareModule,
  ],
})
export class AppModule {}
