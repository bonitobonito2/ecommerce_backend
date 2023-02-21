import { Body, Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registrationDto } from './dtos/registration.dto';
@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Get('/')
  async signup(@Body() data: any) {
    const xd = await this.usersService.getEverything();
    return xd;
  }

  @Post('/registration')
  async registration(@Body() data: registrationDto) {}
}
