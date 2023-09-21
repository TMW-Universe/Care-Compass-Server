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

export interface HeightEntityAttributes extends IIdAndTimestamps {
  userId: uuid;
  height: number;
}
export interface HeightEntityCreateAttributes
  extends OmitIdAndTimestamps<HeightEntityAttributes> {}

@Table({
  paranoid: true,
  tableName: 'height',
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
export class HeightEntity
  extends Model<HeightEntityAttributes, HeightEntityCreateAttributes>
  implements OmitTimestamps<HeightEntityAttributes>
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
  height: number; // Stored in CM
}
