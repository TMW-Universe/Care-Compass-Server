import { Injectable } from '@nestjs/common';
import { RepositoryOptions } from '../../../types/database/repository/repository-options.interface';
import { uuid } from '@tmw-universe/tmw-universe-types';
import {
  HeightEntity,
  HeightEntityAttributes,
  HeightEntityCreateAttributes,
} from 'src/database/entities/metrics/height.entity';

@Injectable()
export class HeightRepository {
  async findHeightById(weightId: uuid, options?: RepositoryOptions) {
    return await HeightEntity.findByPk(weightId, options);
  }

  async createHeight(
    weight: HeightEntityCreateAttributes,
    options?: RepositoryOptions,
  ) {
    return await HeightEntity.create(weight, options);
  }

  async findLatestHeightByUserId(userId: uuid, options?: RepositoryOptions) {
    return await HeightEntity.findOne({
      where: {
        userId,
      },
      limit: 1,
      order: [['createdAt' as keyof HeightEntityAttributes, 'DESC']],
      ...options,
    });
  }
}
