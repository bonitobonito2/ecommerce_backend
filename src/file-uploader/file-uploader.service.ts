import { Injectable, StreamableFile } from '@nestjs/common';
import { Users } from 'src/auth/entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { ProfilePictures } from './entities/profileImages.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploaderService {
  @InjectRepository(ProfilePictures)
  private readonly profilePictureRepo: Repository<ProfilePictures>;

  public async uploadProfilePicture(file, header) {
    const user = header['user'];

    await this.profilePictureRepo.delete({ user_id: user.id });
    await this.profilePictureRepo.insert({
      user_id: user.id,
      picture_code: user.id,
    });
    return fs.writeFileSync(`./src/uploads/${user.id}.png`, file.buffer);
  }

  public async takeProfilePicture(filename: string) {
    try {
      const filePath = `./src/uploads/${filename}.png`; // Change this to the path where your images are stored
      const patchExsists = fs.existsSync(filePath);
      if (!patchExsists) {
        throw new Error();
      }
      const stream = fs.createReadStream(filePath);
      return new StreamableFile(stream);
    } catch (err) {
      const filePath = `./src/uploads/avatar.jpeg`;
      const stream = fs.createReadStream(filePath);
      return new StreamableFile(stream);
    }
  }
}
