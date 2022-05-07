import { Schema } from 'dynamoose';

export const UserSchema = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  bio: {
    type: String,
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  createAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});
