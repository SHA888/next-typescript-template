import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckDto } from './dto/health-check.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Health check successful',
    type: HealthCheckDto
  })
  check(): HealthCheckDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      service: 'next-typescript-template-backend',
    };
  }
}
