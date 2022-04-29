import { Test, TestingModule } from '@nestjs/testing';
import { articleStatus } from '../model/article.enum';
import { articleService } from '../service/article.service';
import { articleTestImports } from '../test/article-test.imports';
import { articleController } from './article.controller';
import articleJson from './article.data.json';

let controller: articleController;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: articleTestImports,
    providers: [articleService],
    controllers: [articleController],
  }).compile();

  controller = module.get<articleController>(articleController);
});

describe('article Controller', () => {
  beforeAll(async () => {
    expect(controller).toBeDefined();

    // create article records
    await Promise.all(
      articleJson.map(async (input) => {
        const result = await controller.create(input);
        expect(result).toMatchObject({
          ...input,
          status: 'Active',
        });
        expect(result.id).toBeDefined();
      }),
    );
  });

  it('find by userId or targetId', async () => {
    // test findByUserId and findByTargetId
    expect(await controller.find({ userId: 'mary' })).toHaveLength(0);
    expect(await controller.find({ userId: 'user21' })).toHaveLength(2);
    expect(await controller.find({ targetId: 'iphone' })).toHaveLength(0);
  });

  it('update status', async () => {
    const articles = await controller.find({ targetId: 'device21' });
    expect(articles).toHaveLength(1);
    expect(articles[0].status).toBe(articleStatus.Active);

    const updated = await controller.update(articles[0].id, {
      status: articleStatus.Deleted,
    });
    expect(updated).toBeDefined();
    expect(updated.status).toBe(articleStatus.Deleted);
  });

  it('find by id', async () => {
    const articles = await controller.find({ targetId: 'device23' });
    expect(articles).toHaveLength(1);

    const article = await controller.findOne(articles[0].id);
    expect(article).toBeDefined();
    expect(article.id).toBe(articles[0].id);
  });

  it('find by userId and targetId (bad request)', async () => {
    try {
      await controller.find({ targetId: 'device21', userId: 'user21' });
    } catch (e) {
      expect(e).toMatchObject({ status: 400 });
    }
  });

  it('find all (bad request)', async () => {
    try {
      await controller.find({});
    } catch (e) {
      expect(e).toMatchObject({ status: 400 });
    }
  });
});
