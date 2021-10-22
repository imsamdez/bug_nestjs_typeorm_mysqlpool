import { Injectable } from '@nestjs/common';
import { Article } from './Article/article.entity';
import { ArticleRepository } from './Article/article.repository';

@Injectable()
export class AppService {
  constructor(private articleRepository: ArticleRepository) {}

  async getArticles(): Promise<Article[]> {
    const articles = await this.articleRepository.find({});

    return articles;
  }
}
