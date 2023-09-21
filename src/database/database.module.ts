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
            schema,
            logging,
          },
        } = getEnv();
        return {
          dialect: 'mssql',
          schema,
          host,
          port,
          username,
          password,
          database,
          sync: {
            alter: true,
            force: false,
          },
          models: [WeightEntity, HeightEntity, HeartBeatEntity],
          logging: logging ? console.log : undefined,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
