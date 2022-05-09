import { Schema } from 'dynamoose';

export const CommentSchema = new Schema({
  id: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: String,
  },
  createAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});
