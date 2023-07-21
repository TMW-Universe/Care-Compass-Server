import { RepositoryOptions } from '../../../types/database/repository/repository-options.interface';
import { uuid } from '../../../types/generic/uuid.type';
import {
  WeightEntity,
  WeightEntityCreateAttributes,
} from '../../entities/metrics/weight.entity';

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
}
