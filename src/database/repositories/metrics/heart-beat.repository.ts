import { Injectable } from '@nestjs/common';
import { uuid } from '@tmw-universe/tmw-universe-types';
import {
  HeartBeatEntity,
  HeartBeatEntityAttributes,
} from 'src/database/entities/metrics/heart-beat.entity';
import { RepositoryOptions } from 'src/types/database/repository/repository-options.interface';

@Injectable()
export class HeartBeatRepository {
  async findLastestHeartBeatByUserId(
    userId: uuid,
    options?: RepositoryOptions,
  ) {
    return await HeartBeatEntity.findOne({
      where: {
        userId,
      },
      limit: 1,
      order: [['createdAt' as keyof HeartBeatEntityAttributes, 'DESC']],
      ...options,
    });
  }
}
