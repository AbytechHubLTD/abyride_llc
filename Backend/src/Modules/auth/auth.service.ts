import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { OtpManagementService } from '../../Global/Otp-management/otp-management.service';
import { LoggerService } from '../../common/Log/logger.service';
import { isEmailOrPhone } from '../../common/Utils/validation.utils';
import { ClientService } from '../ClientsModule/client.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly otpManagementService: OtpManagementService,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
    private readonly usersService: ClientService,
  ) {}

  async sendOtp(req: { identifier: string }) {
    const { identifier } = req;

    const type = isEmailOrPhone(identifier);
    if (!type) throw new BadRequestException('Invalid identifier: must be email or phone');

    const otp = this.otpManagementService.generateOtp();
    await this.otpManagementService.storeOtp(identifier, otp, 300);

    this.logger.log(`OTP for ${identifier} (type: ${type}): ${otp}`);

    const maskedIdentifier = this.otpManagementService.maskIdentifier(identifier);

    return {
      message: `OTP generated and logged for ${maskedIdentifier}`,
    };
  }

  async verifyAndAuthenticate(userOtp: { identifier: string; otp: string }, res: Response) {
    const { identifier, otp } = userOtp;

    const verification = await this.otpManagementService.verifyOtp(identifier, otp);
    if (!verification.success) {
      throw new BadRequestException(verification.message);
    }

    await this.otpManagementService.deleteOtp(identifier);

    let user = await this.usersService.findOneUser(identifier);
    if (!user) {
      user = await this.usersService.createUser(identifier);
    }

    const token = this.jwtService.sign({ id: user.id, role: 'client' });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    this.logger.log(`User authenticated and token issued for ${identifier}`);

    return {
      token,
      message: 'Authentication successful',
    };
  }

   async getMe(clientId: string) {
  const user = await this.usersService.findUserById(Number(clientId));

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async logout(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    this.logger.log('User logged out and token cleared');
    return { message: 'Logout successful' };
  }
  // other methods...
}
