import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ArticleSubscriber } from './Article/article.subscriber';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 43307,
  username: 'root',
  password: '',
  database: 'bug_nestjs_typeorm_mysqlpool',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  synchronize: true, // has to be disabled in production
  namingStrategy: new SnakeNamingStrategy(),
  timezone: 'Z',
  charset: 'utf8mb4_unicode_ci',
  debug: false,
  logging: ['error'],
  subscribers: [ArticleSubscriber],
};
