import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  DNSHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dns: DNSHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dns.pingCheck('dns', 'https://google.com'),
      () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: process.env.AUTH_HOST,
            port: parseInt(process.env.AUTH_PORT),
          },
        }),
    ]);
  }
}
