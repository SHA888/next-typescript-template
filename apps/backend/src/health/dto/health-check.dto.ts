import { ApiProperty } from "@nestjs/swagger";

export class HealthCheckDto {
  @ApiProperty({ example: 'ok', description: 'Status of the service' })
  status: string;

  @ApiProperty({ example: '2025-07-30T20:19:12.000Z', description: 'Current server timestamp' })
  timestamp: string;

  @ApiProperty({ example: '1.0.0', description: 'API version' })
  version: string;

  @ApiProperty({ example: 'next-typescript-template-backend', description: 'Service name' })
  service: string;
}
