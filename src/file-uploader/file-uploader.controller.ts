import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('file-uploader')
export class FileUploaderController {
  constructor(private uploadFileService: FileUploaderService) {}

  @Post('uploadProfilePicture')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard())
  async uploadProfilePicture(@UploadedFile() file, @Req() user) {
    return await this.uploadFileService.uploadProfilePicture(file, user);
  }

  @Get('images/:filename')
  async getProfileImage(@Param('filename') filename: string) {
    return this.uploadFileService.takeProfilePicture(filename);
  }
}
