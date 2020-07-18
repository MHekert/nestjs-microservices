import { IsString, IsEmail, Matches } from 'class-validator';

export class PasswordChangeDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  verificationCode: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'Password too weak',
  })
  password: string;
}
