import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { WeightRepository } from 'src/database/repositories/metrics/weight.repository';
import { HeightRepository } from 'src/database/repositories/metrics/height.repository';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, WeightRepository, HeightRepository],
})
export class MetricsModule {}
