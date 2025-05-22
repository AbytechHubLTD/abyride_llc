import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailService {

private transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME!,
    pass: process.env.SMTP_PASSWORD!,
  },
  tls: {
    rejectUnauthorized: false, // <- this is the key fix
  },
});

private departmentEmails = {
    hr: 'info@abyride.com',
    support: 'info@abyride.com',
    financial: 'info@abyride.com',
    info: 'info@abyride.com',
};

async sendDepartmentEmail(
    department: 'hr' | 'support' | 'financial' | 'info',
    subject: string,
    messageData: any,
    templateName: string,
) {
    const to = this.departmentEmails[department];
    if (!to) throw new Error('Invalid department');

    const templatePath = path.join(process.cwd(), 'src', 'Templates', `${templateName}.hbs`);
    const templateFile = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateFile);
    const html = template(messageData);

    await this.transporter.sendMail({
      from: `"Ride Reservation" <${process.env.SMTP_USERNAME}>`,
      to,
      subject,
      html,
    });
}
}
