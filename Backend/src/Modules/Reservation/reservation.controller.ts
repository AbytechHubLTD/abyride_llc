// modules/reservation/reservation.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post()
  async createReservation(@Body() body: any) {
    return this.reservationService.handleReservation(body);
  }
}
