import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class Mailer {
  private readonly client: Mail;
  private readonly smtpOptions?: SMTPTransport.Options;

  constructor(private configService: ConfigService) {
    this.smtpOptions = {
      host: this.configService.get('MAIL_HOST'),
      port: parseInt(this.configService.get('MAIL_PORT')),
      debug: true,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
      from: this.configService.get('MAIL_FROM'),
    };

    this.client = createTransport(this.smtpOptions);
  }

  async sendMail(options: Mail.Options) {
    return this.client.sendMail(options);
  }
}
