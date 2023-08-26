import { Injectable } from "@nestjs/common";
import { UserSettingsEntity } from "src/database/entities/platform/user-settings.entity";
import { RepositoryOptions } from "src/types/database/repository/repository-options.interface";
import { uuid } from "src/types/generic/uuid.type";

@Injectable()
export class UserSettingsRepository {
    async findSettingsByUserId(userId: uuid, options?: RepositoryOptions) {
        return await UserSettingsEntity.findOne({ where: { userId }, ...options });
    }
}