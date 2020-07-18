import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SignUpEventDto {
  @Expose()
  email: string;

  @Expose()
  verificationCode: string;
}
