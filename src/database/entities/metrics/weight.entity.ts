import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IIdAndTimestamps } from '../../../types/database/id-and-timestamps.interface';
import { OmitIdAndTimestamps } from '../../../types/database/omit-id-and-timestamps.type';
import { OmitTimestamps } from '../../../types/database/omit-timestamps.type';
import { uuid } from '../../../types/generic/uuid.type';

export interface WeightEntityAttributes extends IIdAndTimestamps {
  userId: uuid;
  value: number;
}
export interface WeightEntityCreateAttributes
  extends OmitIdAndTimestamps<WeightEntityAttributes> {}

@Table({
  paranoid: true,
  tableName: 'weight',
  indexes: [
    {
      fields: ['userId'],
      unique: false,
    },
    {
      fields: ['createdAt'],
      unique: false,
    },
  ],
})
export class WeightEntity
  extends Model<WeightEntityAttributes, WeightEntityCreateAttributes>
  implements OmitTimestamps<WeightEntityAttributes>
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: uuid;

  @AllowNull(false)
  @Column(DataType.UUID)
  userId: uuid;

  @AllowNull(false)
  @Column(DataType.DECIMAL(5, 2))
  value: number;
}
