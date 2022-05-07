import { Schema } from 'dynamoose';

export const ArticleSchema = new Schema({
  id: {
    type: String,
  },
  articleId: {
    type: String,
  },
  slug: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
  },
  tags: {
    type: String,
  },
  author: {
    type: String,
  },
  favoritedUsers: {
    type: [String],
  },
  favoritesCount: {
    type: String,
  },
  favorited: {
    type: String,
  },
  Comment: {
    type: [String],
  },
  createAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});
