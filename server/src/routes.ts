import { Router } from 'express';
import { config } from 'dotenv';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

config();

export const routes = Router();

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  );

  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return response.status(201).json({ data: feedback });
});
