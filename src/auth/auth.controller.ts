import { Body, Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Get('/')
  async signup(@Body() data: any) {
    const xd = await this.usersService.getEverything();
    return xd;
  }

  @Get('/save')
  async save(@Body() data: any) {
    const xd = await this.usersService.save();
    return xd;
  }
}
