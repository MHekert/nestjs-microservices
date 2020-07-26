import { IsString, IsOptional, ValidateNested } from 'class-validator';
import {
  Type,
  Transform,
  Expose,
  Exclude,
  plainToClass,
} from 'class-transformer';
import { decode } from 'jsonwebtoken';
import { AuthorDto } from './author.dto';
import { IResource } from '../entities/resource.entity';

const decodePayload = (_value: any, obj: any & { token: string }): AuthorDto =>
  plainToClass(AuthorDto, decode(obj.token));

@Exclude()
export class InsertResourceDto implements IResource {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Expose({ name: 'author' })
  @ValidateNested()
  @Type(() => AuthorDto)
  @Transform(decodePayload)
  author: AuthorDto;
}
