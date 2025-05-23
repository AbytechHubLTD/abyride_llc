import { Injectable } from '@nestjs/common';
import { AddressProcessorService } from '../../Global/RouteSense/address-processor.service';
import { PricingService } from '../../Global/Pricing/pricing.service';
import Stripe from 'stripe';
import { PrismaService } from '../../Prisma/prisma.service';  // adjust path accordingly
import { EmailService } from 'src/Global/Messages/email/email.service';

@Injectable()
export class ReservationService {
  private stripe: Stripe;


  constructor(
    private addressProcessor: AddressProcessorService,
    private pricingService: PricingService,
    private emailService: EmailService,
    private prisma: PrismaService,
  ) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not defined');
    }

    this.stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-04-30.basil', // or whatever is shown in the error
    });
  }



  async handleReservation(data: any) {
const { pickup, dropoff, fullName, email, phoneNumber } = data;

    // Calculate distance & traffic
    const distanceData = await this.addressProcessor.calculateDistanceAndTraffic(pickup, dropoff);

    // Calculate price based on distance and traffic
    const price = this.pricingService.calculatePrice(distanceData.distance, distanceData.traffic);

    // Create Stripe checkout session (payment link)
    const session = await this.stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  mode: 'payment',
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Ride Reservation',
        description: `Pickup: ${pickup} - Dropoff: ${dropoff}`,
      },
      unit_amount: Math.round(price * 100),
    },
    quantity: 1,
  }],
  customer_email: email,
  success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
});


    // Save reservation + payment info to database
   const paymentRecord = await this.prisma.reservation.create({
  data: {
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    pickup,
    dropoff,
 distance: distanceData.distance,      // explicitly use distanceData.distance
    duration: distanceData.duration,      // explicitly use distanceData.duration
    traffic: distanceData.traffic,        // explicitly use distanceData.traffic        // must be a String
    price,
    paymentUrl: session.url!, // assuming you verified it's not null
  },
});





    return {
      success: true,
      message: 'Distance, traffic, price calculated and payment link created successfully',
      data: {
        ...distanceData,
        price,
        paymentUrl: session.url,
        paymentRecordId: paymentRecord.id,
      },
    };
  }
}
