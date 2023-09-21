import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { uuid } from '@tmw-universe/tmw-universe-types';
import { UserId } from '@tmw-universe/tmw-universe-nestjs-auth-utils';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('all')
  async getAllMetrics(@UserId() userId: uuid) {
    return await this.metricsService.getAllMetricsByUser(userId);
  }
}
