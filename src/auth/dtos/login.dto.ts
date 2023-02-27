import { MinLength, IsEmail, IsString } from 'class-validator';

export default class LoginDto {
  @IsString()
  @MinLength(5)
  password: string;
  @IsString()
  @IsEmail()
  email: string = undefined;
}
