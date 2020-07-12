import { IsString, IsEmail } from 'class-validator';

export class VerifyUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  verificationCode: string;
}
