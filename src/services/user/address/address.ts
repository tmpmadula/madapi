import { InputType, Field } from 'type-graphql';

import Address from './addressInput';

@InputType()
export default class AddressInput {
  @Field((type) => [Address], { nullable: true })
  addresses: Address[];
}
