import { BaseEntity, Column, Entity } from 'typeorm';

export interface IAuthor {
  id: number;
  email: string;
}

@Entity()
export class Author extends BaseEntity {
  @Column()
  id: number;

  @Column()
  email: string;
}
