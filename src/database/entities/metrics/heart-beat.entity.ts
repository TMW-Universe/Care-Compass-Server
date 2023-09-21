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

export interface HeartBeatEntityAttributes extends IIdAndTimestamps {
  userId: uuid;
  bpm: number;
}
export interface HeartBeatEntityCreateAttributes
  extends OmitIdAndTimestamps<HeartBeatEntityAttributes> {}

@Table({
  tableName: 'heart_beat',
  paranoid: true,
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
export class HeartBeatEntity
  extends Model<HeartBeatEntityAttributes, HeartBeatEntityCreateAttributes>
  implements OmitTimestamps<HeartBeatEntityAttributes>
{
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: uuid;

  @AllowNull(false)
  @Column(DataType.UUID)
  userId: uuid;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bpm: number;
}
