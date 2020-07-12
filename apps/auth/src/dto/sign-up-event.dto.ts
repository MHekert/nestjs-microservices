import { Exclude } from 'class-transformer';

export class SignUpEventDto {
  email: string;
  verificationCode: string;

  @Exclude()
  password: string;

  @Exclude()
  id: number;

  @Exclude()
  isVerified: boolean;
}
