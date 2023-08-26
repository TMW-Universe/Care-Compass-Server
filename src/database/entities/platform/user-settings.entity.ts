import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IIdAndTimestamps } from "src/types/database/id-and-timestamps.interface";
import { OmitIdAndTimestamps } from "src/types/database/omit-id-and-timestamps.type";
import { OmitTimestamps } from "src/types/database/omit-timestamps.type";
import { uuid } from "src/types/generic/uuid.type";
import { WeightUnits } from "src/types/platform/weight-units.enum";

export interface UserSettingsAttributes extends IIdAndTimestamps {
    userId: uuid;
    weightUnits: WeightUnits;
}

export interface UserSettingsCreateAttributes extends OmitIdAndTimestamps<UserSettingsAttributes> {}

@Table({
    paranoid: true,
    tableName: 'user_settings',
    indexes: [
        {
            fields: ['userId'],
            unique: true,
        },
        {
            fields: ['deletedAt'],
            unique: false,
        }
    ]
})
export class UserSettingsEntity extends Model<UserSettingsAttributes, UserSettingsCreateAttributes> implements OmitTimestamps<UserSettingsAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: uuid;

    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string;

    @AllowNull(false)
    @Column(DataType.STRING(4))
    weightUnits: WeightUnits;
}