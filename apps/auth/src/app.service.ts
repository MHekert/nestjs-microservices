import { Injectable } from '@nestjs/common';
import { User, IUser } from './user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { hash, compare } from 'bcrypt';
import { generate } from 'shortid';
import { RpcException } from '@nestjs/microservices';
import { VerifyUserDto } from './dto/verify-user.dto';
import { sign } from 'jsonwebtoken';
import * as Exception from '../../../libs/errors/custom-rpc-exception';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createUser(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const user = await this.userRepository.findUserByEmail(email);

    if (user)
      throw new Exception.UnprocessableEntity('E-mail address already in use');

    const userData: IUser = {
      email,
      password: await AppService.hashPassword(password),
      verificationCode: generate(),
      isVerified: false,
    };

    return this.userRepository.createUser(userData);
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<User> {
    const { email, verificationCode } = verifyUserDto;
    const user = await this.userRepository.findUserByEmail(email);

    if (user.verificationCode !== verificationCode)
      throw new Exception.Unauthorized();

    user.isVerified = true;
    return user.save();
  }

  async login(data: SignUpDto): Promise<string> {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      email,
    });

    if (!(await AppService.compareHash(password, user.password)))
      throw new Exception.NotFound();

    if (user)
      throw new Exception.UnprocessableEntity('E-mail address lready in use');

    return AppService.generateToken(user);
  }

  private static generateToken(user: User) {
    const { email, id } = user;
    return sign({ email, id }, process.env.TOKEN_SECRET, {
      expiresIn: '2h',
    });
  }

  private static hashPassword(password) {
    return hash(password, 10);
  }
  private static compareHash(password, hash) {
    return compare(password, hash);
  }
}
