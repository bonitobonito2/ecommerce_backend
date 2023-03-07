import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file-uploader')
export class FileUploaderController {
  constructor(private uploadFileService: FileUploaderService) {}

  @Post('uploadProfilePicture')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePicture(@UploadedFile() file, @Req() user) {
    return await this.uploadFileService.uploadProfilePicture(file, user);
  }

  @Get('images/:filename')
  async getImage(@Param('filename') filename: string, @Req() user) {
    try {
      const filePath = `./src/uploads/${filename}.png`; // Change this to the path where your images are stored
      console.log(filePath, 'filepath');
      const patchExsists = fs.existsSync(filePath);
      if (!patchExsists) {
        throw new Error();
      }
      const stream = fs.createReadStream(filePath);
      return new StreamableFile(stream);
    } catch (err) {
      // console.log('shemovedi');
      const filePath = `./src/uploads/avatar.jpeg`;
      const stream = fs.createReadStream(filePath);
      return new StreamableFile(stream);
    }

    // const chunk = stream.on('data', (chunk) => chunk);
  }
}
