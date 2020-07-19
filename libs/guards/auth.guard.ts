import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Unauthorized } from '../errors/custom-rpc-exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { token } = context.getArgs()[0];

    if (!token) return false;

    try {
      verify(token, this.configService.get('TOKEN_SECRET'));
    } catch (err) {
      throw new Unauthorized();
    }

    return true;
  }
}
