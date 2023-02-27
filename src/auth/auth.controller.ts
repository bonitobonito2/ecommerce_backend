import { Body, Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registrationDto } from './dtos/registration.dto';
import LoginDto from './dtos/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Get('/')
  async signup(@Body() data: any) {
    const xd = await this.usersService.getEverything();
    return xd;
  }

  @Post('/registration')
  async registration(@Body() data: registrationDto) {
    console.log(data);
    return await this.usersService.registar(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    console.log(data);
    return await this.usersService.Login(data);
  }
}
