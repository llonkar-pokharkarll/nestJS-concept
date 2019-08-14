import { IsString, IsEmail, IsEmpty, IsNotEmpty, Min, Max, MinLength, MaxLength, Matches } from 'class-validator'
export class createUserDTO {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(8)
  password: string;
}