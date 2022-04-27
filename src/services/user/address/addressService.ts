import { ObjectType, Field, ID } from 'type-graphql';
import Address from './address.type';

@ObjectType()
export default class AddressService {
  @Field((type) => ID)
  id: string;

  @Field((type) => [Address])
  addresses: Address[];
}

export interface Context {
  addressService: AddressService;
}
