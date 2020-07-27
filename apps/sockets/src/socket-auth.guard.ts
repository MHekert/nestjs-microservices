import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { token } = context.getArgs()[1];

    if (!token) return false;

    try {
      verify(token, this.configService.get('TOKEN_SECRET'));
    } catch (err) {
      throw new WsException('Unauthorized');
    }

    return true;
  }
}
