import { Injectable } from '@nestjs/common';
import { uuid } from '@tmw-universe/tmw-universe-types';
import { Sequelize } from 'sequelize-typescript';
import { HeightRepository } from 'src/database/repositories/metrics/height.repository';
import { WeightRepository } from 'src/database/repositories/metrics/weight.repository';

@Injectable()
export class MetricsService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly weightRepository: WeightRepository,
    private readonly heightRepository: HeightRepository,
  ) {}

  async getAllMetricsByUser(userId: uuid) {
    return await this.sequelize.transaction(async (transaction) => {
      return {
        height: await this.heightRepository.findLatestHeightByUserId(userId, {
          transaction,
        }),
        weight: await this.weightRepository.findLatestWeightByUserId(userId, {
          transaction,
        }),
      };
    });
  }
}
