import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Users } from './auth/entities/user.entity';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { FileUploaderController } from './file-uploader/file-uploader.controller';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { UserPosts } from './file-uploader/entities/posts.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'shoppingDB',
      entities: [Users, UserPosts],
      synchronize: true,
    }),
    AuthModule,
    FileUploaderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('');
  }
}
