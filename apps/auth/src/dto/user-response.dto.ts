import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  email: string;
  isVerified: boolean;

  @Exclude()
  password: string;

  @Exclude()
  verificationCode: string;
}
