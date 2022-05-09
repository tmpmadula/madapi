import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Article } from '../model/article.model';
import { ArticlesService } from './articles.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<'Article', 'key'>,
    @InjectModel(User.name) private userModel: Model<'User', 'key'>,
    private readonly articlesService: ArticlesService,
  ) {}
  async addArticleToFavorite(articleId: string, user: 'User') {
    const article = await this.articleModel.findOne({ _id: articleId });
    if (!article) {
      throw new NotFoundException('not found');
    }
    article.favoritedUsers.push(user);
    await article.save();
    return true;
  }

  async deleteArticleFromFavorite(articleId: string, user: 'User') {
    await this.articleModel
      .updateOne(
        {
          _id: articleId,
        },
        {
          $pull: { favoritedUsers: user._id },
        },
      )
      .exec();
    return true;
  }

  async isArticlesFavoriteByUser(
    user: 'User',
    articleIds: string[],
  ): Promise<boolean[]> {
    const articles = await this.articlesService.findByIds(articleIds);
    return articles.map((article) =>
      !article.favoritedUsers
        ? false
        : !!article.favoritedUsers.find(
            (u) => u._id.toString() === user._id.toString(),
          ),
    );
  }
}
