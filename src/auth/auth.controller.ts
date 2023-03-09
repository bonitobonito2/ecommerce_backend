import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registrationDto } from './dtos/registration.dto';
import LoginDto from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import ChangePasswordDto from './dtos/changePassword.dto';
@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Get('/')
  @UseGuards(AuthGuard())
  async signup(@Body() data: any) {
    const xd = await this.usersService.getEverything();
    return xd;
  }

  @Post('changePassword')
  async changePassword(@Body() data: ChangePasswordDto) {
    return await this.usersService.changePassword(data);
  }

  @Get('/isTokenValid')
  @UseGuards(AuthGuard())
  async isTokenValid(@Body() data: any, @Req() user) {
    return user['user'];
  }

  @Post('/registration')
  async registration(@Body() data: registrationDto) {
    console.log(data);
    return await this.usersService.registar(data);
  }

  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.usersService.Login(data);
  }
}
