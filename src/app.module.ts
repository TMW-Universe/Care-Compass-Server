import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from '@nestjs/passport';
import {
  AZURE_AD_STRATEGY_KEY,
  AzureADStrategy,
} from './strategies/authentication/azure-ad.strategy';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    PassportModule.register({
      defaultStrategy: AZURE_AD_STRATEGY_KEY,
    }),
    DatabaseModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AzureADStrategy,
    },
  ],
})
export class AppModule {}
