import { Router } from 'express';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';

config();

export const routes = Router();

// const transport = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: Number(process.env.MAIL_PORT),
//   auth: {
//     user: process.env.MAIL_AUTH_USER,
//     pass: process.env.MAIL_AUTH_PASS,
//   },
// });

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
  );

  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  // await transport.sendMail({
  //   from: 'Feedget team <oi@feedget.com>',
  //   to: 'Gustavo <gusgalot3g@gmail.com>',
  //   subject: 'New Feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size=16px; color: '#333';">`,
  //     `<h1>Feedback type: ${type}</h1>`,
  //     `<p>Comment: ${comment}</p>`,
  //     `</div>`,
  //   ].join('\n'),
  // });

  return response.status(201).json({ data: feedback });
});
