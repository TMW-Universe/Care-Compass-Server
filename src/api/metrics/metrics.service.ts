import { Injectable } from '@nestjs/common';
import { uuid } from '@tmw-universe/tmw-universe-types';
import { Sequelize } from 'sequelize-typescript';
import { HeartBeatRepository } from 'src/database/repositories/metrics/heart-beat.repository';
import { HeightRepository } from 'src/database/repositories/metrics/height.repository';
import { WeightRepository } from 'src/database/repositories/metrics/weight.repository';

@Injectable()
export class MetricsService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly weightRepository: WeightRepository,
    private readonly heightRepository: HeightRepository,
    private readonly heartBeatRepository: HeartBeatRepository,
  ) {}

  async getAllMetricsByUser(userId: uuid) {
    return await this.sequelize.transaction(async (transaction) => {
      return {
        height: (
          await this.heightRepository.findLatestHeightByUserId(userId, {
            transaction,
          })
        )?.getDataValue('height'),
        weight: (
          await this.weightRepository.findLatestWeightByUserId(userId, {
            transaction,
          })
        )?.getDataValue('weight'),
        heartBmp: (
          await this.heartBeatRepository.findLastestHeartBeatByUserId(userId, {
            transaction,
          })
        )?.getDataValue('bpm'),
      };
    });
  }
}
