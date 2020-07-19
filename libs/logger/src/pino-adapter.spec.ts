import { Test, TestingModule } from '@nestjs/testing';
import { PinoAdapter } from './pino-adapter';

describe('PinoAdapter', () => {
  let provider: PinoAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinoAdapter],
    }).compile();

    provider = module.get<PinoAdapter>(PinoAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
