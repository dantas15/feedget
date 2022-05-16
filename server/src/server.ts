import express from 'express';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { prisma } from './prisma';

config();
const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
});

app.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: 'Feedget team <oi@feedget.com>',
    to: 'Gustavo <gusgalot3g@gmail.com>',
    subject: 'New Feedback',
    html: [
      `<div style="font-family: sans-serif; font-size=16px; color: '#333';">`,
      `<h1>Feedback type: ${type}</h1>`,
      `<p>Comment: ${comment}</p>`,
      `</div>`,
    ].join('\n'),
  });

  return response.status(201).json({ data: feedback });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
