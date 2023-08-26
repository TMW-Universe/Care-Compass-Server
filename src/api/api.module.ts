import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { PlatformModule } from './platform/platform.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [
    PlatformModule
  ],
})
export class ApiModule {}
