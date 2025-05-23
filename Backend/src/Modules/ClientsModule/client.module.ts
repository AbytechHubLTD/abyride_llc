import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { PrismaService } from '../../Prisma/prisma.service';

@Module({
  providers: [ClientService, PrismaService],
  exports: [ClientService],
})
export class ClientModule {}
