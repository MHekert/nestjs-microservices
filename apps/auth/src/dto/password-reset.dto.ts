import { IsString, IsEmail } from 'class-validator';

export class PasswordResetDto {
  @IsString()
  @IsEmail()
  email: string;
}
