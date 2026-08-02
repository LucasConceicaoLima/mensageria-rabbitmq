import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { ResponseMessage } from '../common/decorators/response-message.decorator';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: DashboardResponseDto,
  })
  @ResponseMessage('Dashboard loaded successfully.')
  findDashboard() {
    return this.dashboardService.findDashboard();
  }
}