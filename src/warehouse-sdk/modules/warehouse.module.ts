import { DynamicModule, Module } from '@nestjs/common';

export const TMWU_WAREHOUSE_SETTINGS_PROVIDER =
  'tmwu_warehouse_settings_provider';

type RegisterOptions = {
  apiKey: string;
};

export interface TMWUWarehouseProvider extends RegisterOptions {}

@Module({})
export class WarehouseModule {
  static register(options: RegisterOptions): DynamicModule {
    return {
      module: WarehouseModule,
      providers: [
        {
          provide: TMWU_WAREHOUSE_SETTINGS_PROVIDER,
          useValue: options satisfies TMWUWarehouseProvider,
        },
      ],
    };
  }

  static async registerAsync(fn: () => Promise<RegisterOptions>) {
    return WarehouseModule.register(await fn());
  }
}
