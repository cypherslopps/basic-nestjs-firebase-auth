import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
