import { registerEnumType } from 'type-graphql';

export enum PlanType {
  Free,
  Pro,
  Verified
}

registerEnumType(PlanType, {
  name: 'PlanType',
  description: 'All possible plan Types'
});
