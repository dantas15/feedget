import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Feedget team <oi@feedget.com>',
      to: 'Gustavo <gusgalot3g@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}
