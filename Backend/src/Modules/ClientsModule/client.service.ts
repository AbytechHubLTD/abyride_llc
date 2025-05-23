import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../Prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneUser(identifier: string) {
    const isEmail = identifier.includes('@');

    return this.prisma.client.findFirst({
      where: isEmail ? { Client_email: identifier } : { Client_phoneNumber: identifier },
    });
  }

  async createUser(identifier: string) {
    const isEmail = identifier.includes('@');

    return this.prisma.client.create({
      data: isEmail
        ? { Client_email: identifier }
        : { Client_phoneNumber: identifier },
    });
  }

  async findUserById(id: number) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }
}
