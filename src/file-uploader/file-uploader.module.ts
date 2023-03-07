import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/auth/entities/user.entity';
import { ProfilePictures } from './entities/profileImages.entity';
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ProfilePictures, Users])],
  controllers: [FileUploaderController],
  providers: [FileUploaderService],
})
export class FileUploaderModule {}
