import { InputType, Field } from 'type-graphql';

import Service from './serviceInput';

@InputType()
export default class ServiceInput {
  @Field((type) => [Service], { nullable: true })
  services: Service[];
}
