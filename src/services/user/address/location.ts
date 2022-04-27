import { InputType, Field } from 'type-graphql';
import Location from './location.type';
@InputType({ description: 'Location Input data' })
export default class LocationInput implements Partial<Location> {
  @Field()
  longX: string;

  @Field()
  latY: string;
}
