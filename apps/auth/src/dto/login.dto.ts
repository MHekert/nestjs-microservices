import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
