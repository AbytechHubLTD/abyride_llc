import { Injectable } from '@nestjs/common';

@Injectable()
export class PricingService {
  // Simple pricing logic: base fare + (distance * rate) + traffic surcharge
  calculatePrice(distanceKm: number, trafficLevel: string): number {
    const baseFare = 3; // base fare in your currency
    const perKmRate = 1.5; // per km charge
    let trafficMultiplier = 1;

    switch (trafficLevel.toLowerCase()) {
      case 'heavy':
        trafficMultiplier = 1.5;
        break;
      case 'moderate':
        trafficMultiplier = 1.2;
        break;
      case 'light':
      default:
        trafficMultiplier = 1;
        break;
    }

    const price = (baseFare + distanceKm * perKmRate) * trafficMultiplier;
    return Math.round(price * 100) / 100; // rounded to 2 decimals
  }
}
