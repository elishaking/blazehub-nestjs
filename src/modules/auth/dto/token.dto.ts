import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsString()
  readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
