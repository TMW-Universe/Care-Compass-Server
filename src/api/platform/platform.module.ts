import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { UserSettingsRepository } from 'src/database/repositories/platform/user-settings.repository';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService, UserSettingsRepository],
})
export class PlatformModule {}
