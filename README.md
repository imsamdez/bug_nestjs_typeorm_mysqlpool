# bug_nestjs_typeorm_mysqlpool

## Requirements

- MySQL database to connect to (update `src/typeorm.config.ts`)
- Apache Benchmark

## About this repo

This repo illustrate an issue with typeorm subscribers.

In this dummy example, we have two entities: Article and Comment and a MySQL pool size set to 10 (default value).

A `afterLoad` subscriber is defined on Article.

```typescript
  // src/Article/article.subscriber.ts

  async afterLoad(article: Article): Promise<void> {
    const commentRepository = getManager().getRepository(Comment);

    // Let's try to retrieve all comments, which is not real-case but it's just to illustrate...
    // This won't work and will make MySQL pool not responding to any requests
    try {
      article.totalComments = await commentRepository
        .createQueryBuilder('comment')
        .getCount();
    } catch (err) {
      console.error('After load failed with error :', err.message);
    }
  }
```

## Test

Launch the api and run a first Apache Benchmark with 10 concurrent requests

```
ab -n 10 -c 10 http://localhost:4001
```

Every thing is fine.
Now, run a second Apache Benchmark with 11 concurrent requests

```
ab -n 11 -c 11 http://localhost:4001
```

The API is down and it seems that the MySQL pool is not responding to any request. You can even try to `curl` the API, it wont respond.
