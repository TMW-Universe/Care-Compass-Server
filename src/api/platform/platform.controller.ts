import { Controller, Get, UseGuards } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('platform')
@UseGuards(AuthGuard())
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get('my-settings')
  async getMySettings() {
    return {
      done: true,
    };
  }
}
