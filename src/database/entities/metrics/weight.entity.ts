import {
  IIdAndTimestamps,
  OmitIdAndTimestamps,
  OmitTimestamps,
  uuid,
} from '@tmw-universe/tmw-universe-types';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export interface WeightEntityAttributes extends IIdAndTimestamps {
  userId: uuid;
  weight: number;
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
    {
      fields: ['deletedAt'],
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
  weight: number; // Stored in g
}
