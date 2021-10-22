import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Article } from './Article/article.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getArticles(): Promise<Article[]> {
    return this.appService.getArticles();
  }
}
