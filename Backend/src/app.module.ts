// app.module.ts
import { Module } from '@nestjs/common';
import { ReservationModule } from './Modules/Reservation/reservation.module';
@Module({
  imports: [
    ReservationModule,
  ],

  
})
export class AppModule {}
