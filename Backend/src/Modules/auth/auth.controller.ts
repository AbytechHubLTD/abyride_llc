import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { ClientAuthGuard } from '../../Guards/ClientAuth.Guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body() body: { identifier: string }) {
    return this.authService.sendOtp(body);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { identifier: string; otp: string }, @Res() res: Response) {
    const result = await this.authService.verifyAndAuthenticate(body, res);
    res.status(200).json(result);
  }

  @Get('me')
  @UseGuards(ClientAuthGuard)
  async getMe(@Req() req: Request) {
    const client = (req as any).client;
    const userData = await this.authService.getMe(client.id);
    return { user: userData, authenticated: true };
  }

  @Post('logout')
  @UseGuards(ClientAuthGuard)
  async logout(@Res() res: Response) {
    await this.authService.logout(res);
    res.status(200).json({ message: 'Logout successful' });
  }
}
