import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class registrationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'first_name must have at least 3 chars' })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'last_name must have at least 3 chars' })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'password must have at least 5 chars' })
  password: string;
}
