import { Schema } from 'dynamoose';

export const ArticleSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  articleId: {
    type: String,
  },
  slug: {
    type: String,
  },
  status: {
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
  userId: {
    type: String,
    index: {
      global: true,
      rangeKey: 'status',
    },
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
