import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './test.entity';
import { registrationDto } from './dtos/registration.dto';
import { JwtService } from '@nestjs/jwt/dist';

import LoginDto from './dtos/login.dto';

@Injectable()
export class AuthService {
  @InjectRepository(Users)
  private readonly messagesRepository: Repository<Users>;

  constructor(private jwtService: JwtService) {}

  public async getEverything() {
    const data = await this.messagesRepository.find();
    console.log(data);
    return data;
  }
  public async registar(data: registrationDto) {
    const checkIfEmailExsists = await this.messagesRepository.findOneBy({
      email: data.email,
    });
    if (checkIfEmailExsists) return 'email already exsists';
    const registar = await this.messagesRepository.insert({
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      email: data.email,
      password: data.password,
    });
    return registar;
  }

  async Login(user: LoginDto) {
    const { email, password } = user;
    const userExsists: Users = await this.messagesRepository.findOneBy({
      email: email,
    });
    // console.log(userExsists);

    if (
      userExsists &&
      password == userExsists.password
      // (await bycript.compare(password, userExsists.password))
    ) {
      const payload = { email };
      const accsessToken: string = await this.jwtService.sign(payload);
      return {
        id: userExsists.id,
        payload: accsessToken,
        firstName: userExsists.first_name,
        gender: userExsists.gender,
        lastName: userExsists.last_name,
        email: userExsists.email,
      };
    } else {
      return {
        payload: 'password or email is incorrect',
      };
    }
  }
}
