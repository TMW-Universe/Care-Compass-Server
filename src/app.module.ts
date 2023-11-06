import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { APP_GUARD } from '@nestjs/core';
import { getEnv } from './utils/config/get-env';
import {
  AuthGuard,
  AuthModule,
} from '@tmw-universe/tmw-universe-nestjs-auth-utils';
import { WarehouseModule } from './warehouse-sdk/modules/warehouse.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    AuthModule.register({
      authHost: getEnv().auth.host,
      configRetryDelay: getEnv().auth.configRetryDelay,
      domain: getEnv().domain,
    }),
    WarehouseModule.registerAsync(async () => {
      return {
        apiKey: '',
      };
    }),
    DatabaseModule,
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
