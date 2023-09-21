import { Injectable } from '@nestjs/common';
import { RepositoryOptions } from '../../../types/database/repository/repository-options.interface';
import {
  WeightEntity,
  WeightEntityAttributes,
  WeightEntityCreateAttributes,
} from '../../entities/metrics/weight.entity';
import { uuid } from '@tmw-universe/tmw-universe-types';

@Injectable()
export class WeightRepository {
  async findWeightById(weightId: uuid, options?: RepositoryOptions) {
    return await WeightEntity.findByPk(weightId, options);
  }

  async createWeight(
    weight: WeightEntityCreateAttributes,
    options?: RepositoryOptions,
  ) {
    return await WeightEntity.create(weight, options);
  }

  async findLatestWeightByUserId(userId: uuid, options?: RepositoryOptions) {
    return await WeightEntity.findOne({
      where: {
        userId,
      },
      limit: 1,
      order: [['createdAt' as keyof WeightEntityAttributes, 'DESC']],
      ...options,
    });
  }
}
