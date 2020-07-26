import { Exclude, Expose } from 'class-transformer';
import { ObjectID } from 'mongodb';

@Exclude()
export class NewResourceEventDto {
  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  id: ObjectID;

  @Expose()
  author: {
    id: number;
    email: string;
  };
}
