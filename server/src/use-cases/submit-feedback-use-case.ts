import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot: string | null;
}

export class SubmitFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    return feedback;
  }
}
