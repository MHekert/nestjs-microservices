import { IsString } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  verificationCode: string;
}
