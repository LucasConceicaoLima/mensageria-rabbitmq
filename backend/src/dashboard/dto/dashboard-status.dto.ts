import { ApiProperty } from '@nestjs/swagger';

export class DashboardStatusDto {
  @ApiProperty()
  pending!: number;

  @ApiProperty()
  processing!: number;

  @ApiProperty()
  approved!: number;

  @ApiProperty()
  rejected!: number;

  @ApiProperty()
  pendingRevenue!: number;

  @ApiProperty()
  processingRevenue!: number;

  @ApiProperty()
  approvedRevenue!: number;

  @ApiProperty()
  rejectedRevenue!: number;
}
