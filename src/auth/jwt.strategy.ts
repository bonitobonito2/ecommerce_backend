import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';

interface getInfo {
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private readonly tasksRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: getInfo): Promise<Users> {
    const { email } = payload;
    const userExsists = await this.tasksRepository.findOneBy({ email: email });
    if (userExsists) {
      return userExsists;
    } else {
      throw new UnauthorizedException();
    }
  }
}
