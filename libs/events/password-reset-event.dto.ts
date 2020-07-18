import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class PasswordResetEventDto {
  @Expose()
  email: string;

  @Expose()
  verificationCode: string;
}
