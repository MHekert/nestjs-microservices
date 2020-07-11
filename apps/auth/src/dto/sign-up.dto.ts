import { IsString, Matches } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'password too weak',
  })
  password: string;
}
