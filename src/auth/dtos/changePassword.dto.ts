import { MinLength, IsEmail, IsString } from 'class-validator';

export default class ChangePasswordDto {
  @IsString()
  @MinLength(5)
  oldPassword: string;

  @IsString()
  @MinLength(5)
  newPassword: string;

  @IsString()
  @IsEmail()
  email: string;
}
