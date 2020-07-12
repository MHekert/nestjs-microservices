import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

export interface IUser {
  id?: number;
  email: string;
  password: string;
  isVerified: boolean;
  verificationCode: string | null;
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'is_verified' })
  isVerified: boolean = false;

  @Column({ name: 'verification_code', nullable: true })
  verificationCode: string;
}
