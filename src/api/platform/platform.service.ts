import { Injectable } from '@nestjs/common';
import { UserSettingsRepository } from 'src/database/repositories/platform/user-settings.repository';
import { uuid } from 'src/types/generic/uuid.type';

@Injectable()
export class PlatformService {
  constructor(private readonly userSettings: UserSettingsRepository) {}

  async findSettingsByUserId(userId: uuid) {
    return await this.userSettings.findSettingsByUserId(userId);
  }
}
