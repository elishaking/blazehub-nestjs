import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PasswordResetDto {
  @ApiProperty()
  @IsString()
  readonly token: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  constructor(token: string, password: string) {
    this.token = token;
    this.password = password;
  }
}
