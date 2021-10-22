import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleRepository } from './Article/article.repository';
import { CommentRepository } from './Comment/comment.repository';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([ArticleRepository, CommentRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
