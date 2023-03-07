import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/auth/entities/user.entity';
import { ProfilePictures } from './entities/profileImages.entity';
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilePictures, Users]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [FileUploaderController],
  providers: [FileUploaderService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class FileUploaderModule {}
