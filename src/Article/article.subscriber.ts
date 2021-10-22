import { Comment } from 'src/Comment/comment.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  getManager,
} from 'typeorm';
import { Article } from './article.entity';

@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {
  listenTo(): any {
    return Article;
  }

  async afterLoad(article: Article): Promise<void> {
    const commentRepository = getManager().getRepository(Comment);

    // Let's try to retrieve data from another repository...
    // This won't work and will make MySQL pool not responding to any requests
    try {
      article.totalComments = await commentRepository
        .createQueryBuilder('comment')
        .getCount();
    } catch (err) {
      console.error('After load failed with error :', err.message);
    }
  }
}
