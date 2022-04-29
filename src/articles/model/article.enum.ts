import { registerEnumType } from '@nestjs/graphql';

enum articleStatus {
  Active = 'Active',
  Deleted = 'Deleted',
}

registerEnumType(articleStatus, {
  name: 'articleStatus',
});

export { articleStatus };
