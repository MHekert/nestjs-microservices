import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoggerService } from '../../../../libs/logger/src';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  const loggerMock = { log: jest.fn().mockImplementation(arg => arg) };
  let authServiceMock;

  beforeEach(async () => {
    authServiceMock = {
      signUp: jest.fn(),
      verifyUser: jest.fn(),
      login: jest.fn(),
      resetPassword: jest.fn(),
      changePassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: LoggerService,
          useValue: loggerMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
