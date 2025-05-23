// app.module.ts
import { Module } from '@nestjs/common';
import { ReservationModule } from './Modules/Reservation/reservation.module';
import { CommonModule } from './common/common.module';
import { Client_authModule } from './Modules/auth/client_auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so you don't have to import ConfigModule in every module
    }),
    ReservationModule,
    CommonModule,
    Client_authModule
  ],

  
})
export class AppModule {}
