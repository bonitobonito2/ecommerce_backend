import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './test.entity';
import { registrationDto } from './dtos/registration.dto';

@Injectable()
export class AuthService {
  @InjectRepository(Users)
  private readonly messagesRepository: Repository<Users>;

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
}
