import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/auth/entities/user.entity';
import { UserPosts } from './entities/posts.entity';
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PostImages } from './entities/postImages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPosts, Users, PostImages]),
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
