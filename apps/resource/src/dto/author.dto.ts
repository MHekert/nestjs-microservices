import { IsInt, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { IAuthor } from '../entities/author.entity';

@Exclude()
export class AuthorDto implements IAuthor {
  @Expose()
  @IsInt()
  id: number;

  @Expose()
  @IsEmail()
  email: string;
}
