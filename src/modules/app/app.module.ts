import { Module, NestModule } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import V1Module from '@v1/v1.module';

import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import LoggerMiddleware from 'src/middlewares/logger.middleware';
import AppController from './app.controller';
import AppService from './app.service';
import AppGateway from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      autoReconnect: true,
      useCreateIndex: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RedisModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        config: {
          url: cfg.get('127.0.0.1:6379'),
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        transport: {
          host: cfg.get('MAILER_HOST'),
          port: Number(cfg.get('MAILER_PORT')),
          secure: false,
          auth: {
            user: cfg.get('MAILER_USERNAME'),
            pass: cfg.get('MAILER_PASSWORD'),
          },
        },
        defaults: {
          from: cfg.get('MAILER_FROM_EMAIL'),
        },
        template: {
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
