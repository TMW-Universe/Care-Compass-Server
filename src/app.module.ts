import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { APP_GUARD } from '@nestjs/core';
import { AzureADGuard } from './guards/authentication/azure-ad.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    DatabaseModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AzureADGuard,
    },
  ],
})
export class AppModule {}
