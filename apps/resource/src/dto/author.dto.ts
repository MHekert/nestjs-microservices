import { IsInt, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AuthorDto {
  @Expose()
  @IsInt()
  id: number;

  @Expose()
  @IsEmail()
  email: string;
}
