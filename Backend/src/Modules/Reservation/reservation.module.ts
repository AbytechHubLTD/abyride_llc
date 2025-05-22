// src/modules/reservation/reservation.module.ts
import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { AddressProcessorModule } from '../../Global/RouteSense/address-processor.module';
import { ReservationController } from './reservation.controller';
import { PricingModule } from 'src/Global/Pricing/pricing.module';
import { PrismaModule } from 'src/Prisma/prisma.module';
import { EmailModule } from 'src/Global/Messages/email.module';

@Module({
  imports: [
    AddressProcessorModule,
    PricingModule,
    PrismaModule,
    EmailModule
  ],  // Import the module here
  providers: [ReservationService],
  exports: [ReservationService],
  controllers:[ReservationController]
})
export class ReservationModule {}
