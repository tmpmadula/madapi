import { Test, TestingModule } from '@nestjs/testing';
import { articleStatus } from '../model/article.enum';
import { ArticleService } from '../service/article.service';
import { articleTestImports } from '../test/article-test.imports';
import articleJson from './article.data.json';
import { ArticleResolver } from './article.resolver';
let resolver: ArticleResolver;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: articleTestImports,
    providers: [ArticleService, ArticleResolver],
  }).compile();

  resolver = module.get<ArticleResolver>(ArticleResolver);
});

describe('article Resolver', () => {
  beforeAll(async () => {
    expect(resolver).toBeDefined();

    // create article records
    await Promise.all(
      articleJson.map(async (input) => {
        const result = await resolver.createarticle(input);
        expect(result).toMatchObject({
          ...input,
          status: articleStatus.Active,
        });
        expect(result.id).toBeDefined();
      }),
    );
  });

  it('find by userId or targetId', async () => {
    // test findByUserId and findByTargetId
    expect(await resolver.articleByUserId('mary')).toHaveLength(0);
    expect(await resolver.articleByUserId('user11')).toHaveLength(2);
    expect(await resolver.articleByTargetId('iphone')).toHaveLength(0);
  });

  it('update status', async () => {
    const articles = await resolver.articleByTargetId('device11');
    expect(articles).toHaveLength(1);
    expect(articles[0].status).toBe(articleStatus.Active);

    const updated = await resolver.updatearticle(articles[0].id, {
      status: articleStatus.Deleted,
    });
    expect(updated).toBeDefined();
    expect(updated.status).toBe(articleStatus.Deleted);
  });

  it('find by id', async () => {
    const articles = await resolver.articleByTargetId('device13');
    expect(articles).toHaveLength(1);

    const article = await resolver.article(articles[0].id);
    expect(article).toBeDefined();
    expect(article.id).toBe(articles[0].id);
  });
});
