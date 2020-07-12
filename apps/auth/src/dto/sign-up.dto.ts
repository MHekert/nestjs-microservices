import { IsString, Matches, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'Password too weak',
  })
  password: string;
}
