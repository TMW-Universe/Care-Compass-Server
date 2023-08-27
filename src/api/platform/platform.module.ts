import { Module } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';
import { UserSettingsRepository } from 'src/database/repositories/platform/user-settings.repository';
import { PassportModule } from '@nestjs/passport';
import { AZURE_AD_STRATEGY_KEY } from 'src/strategies/authentication/azure-ad.strategy';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService, UserSettingsRepository],
  imports: [
    PassportModule.register({
      defaultStrategy: AZURE_AD_STRATEGY_KEY,
    }),
  ],
})
export class PlatformModule {}
