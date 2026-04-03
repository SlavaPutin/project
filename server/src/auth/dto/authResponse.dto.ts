import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1...', description: 'Access токен' })
    accessToken: string;

    @ApiProperty({ example: 'def456...', description: 'Refresh токен' })
    refreshToken: string;
}