import { InputType, Field, ID } from 'type-graphql';
import Service from './service.type';
@InputType({ description: 'New recipe data' })
export default class AddServiceInput implements Partial<Service> {
  @Field((type) => ID)
  service_id: string;
}
