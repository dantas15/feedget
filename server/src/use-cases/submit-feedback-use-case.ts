import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string | null;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'New Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size=16px; color: '#333';">`,
        `<h1>Feedback type: ${type}</h1>`,
        `<p>Comment: ${comment}</p>`,
        `</div>`,
      ].join('\n'),
    });

    return feedback;
  }
}
