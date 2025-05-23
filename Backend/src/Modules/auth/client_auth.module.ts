import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientAuthGuard } from '../../Guards/ClientAuth.Guard';

import { CommonModule } from '../../common/common.module'; // global module
import { ClientModule } from '../ClientsModule/client.module';

@Module({
  imports: [
    ClientModule,
    CommonModule, // global providers (OtpManagementService, LoggerService)
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, ClientAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class Client_authModule {}
