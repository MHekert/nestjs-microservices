import { Test, TestingModule } from '@nestjs/testing';
import { PinoAdapter } from './pino-adapter';
import { ConfigModule } from '@nestjs/config';

describe('PinoAdapter', () => {
  let provider: PinoAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [PinoAdapter],
    }).compile();

    provider = module.get<PinoAdapter>(PinoAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
