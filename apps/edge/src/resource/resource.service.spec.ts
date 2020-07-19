import { Test, TestingModule } from '@nestjs/testing';
import { ResourceService } from './resource.service';
import { ClientProxy } from '@nestjs/microservices';

describe('ResourceService', () => {
  let service: ResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourceService,
        {
          provide: ClientProxy,
          useValue: jest.fn(),
        },
        {
          provide: 'RESOURCE',
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ResourceService>(ResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
