import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [MetricsModule],
})
export class ApiModule {}
