import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './test.entity';

@Injectable()
export class AuthService {
  @InjectRepository(Users)
  private readonly messagesRepository: Repository<Users>;

  public async getEverything() {
    const data = await this.messagesRepository.query('select * from user');
    console.log(data);
    return data;
  }
  public async save() {
    const data = await this.messagesRepository.insert({
      first_name: 'dito',
      last_name: 'lastname',
      gender: 'male',
      email: 'dito@gmail.com',
    });
    return data;
  }

  public async delete() {
    const data = await this.messagesRepository.query('DELETE FROM user ');

    return 'deleted every single raw';
  }
}
