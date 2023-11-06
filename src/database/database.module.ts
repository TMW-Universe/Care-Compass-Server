import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { getEnv } from 'src/utils/config/get-env';
import { WeightEntity } from './entities/metrics/weight.entity';
import { HeightEntity } from './entities/metrics/height.entity';
import { HeartBeatEntity } from './entities/metrics/heart-beat.entity';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async () => {
        const {
          database: {
            host,
            user: username,
            password,
            name: database,
            port,
            logging,
          },
        } = getEnv();
        return {
          dialect: 'mysql',
          host,
          port,
          username,
          password,
          database,
          sync: {
            alter: true,
            force: false,
          },
          autoLoadModels: true,
          synchronize: true,
          models: [WeightEntity, HeightEntity, HeartBeatEntity],
          logging: logging ? console.log : undefined,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
