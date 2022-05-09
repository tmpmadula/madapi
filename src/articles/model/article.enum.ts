import { registerEnumType } from '@nestjs/graphql';

enum ArticleStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}

registerEnumType(ArticleStatus, {
  name: 'articleStatus',
});

export { ArticleStatus };
