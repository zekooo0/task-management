import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { InService } from './in.service';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('in')
@UseGuards(AuthGuard())
export class InController {
  constructor(private inService: InService) {}

  @Get('/profile')
  getScrapeData(@GetUser() user) {
    return this.inService.getScrapeData(user);
  }
}
