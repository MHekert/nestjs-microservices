import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class VerifyUserEventDto {
  @Expose()
  email: string;
}
