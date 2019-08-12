import { IsNotEmpty } from 'class-validator';
export class createEventDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}