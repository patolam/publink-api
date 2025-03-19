import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "node:process";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      entities: [],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      ssl: { rejectUnauthorized: false },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
