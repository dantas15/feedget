import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'type',
        comment: 'comment',
        screenshot: null,
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({ type: '', comment: 'asdsa', screenshot: null }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({ type: 'asdsa', comment: '', screenshot: null }),
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    const feedbackWithInvalidScreenshot = {
      type: 'asdsa',
      comment: 'asdas',
      screenshot: 'test.jpg',
    };
    const feedbackWithValidScreenshot = {
      ...feedbackWithInvalidScreenshot,
      screenshot: 'data:image/png;base64',
    };

    await expect(
      submitFeedback.execute(feedbackWithInvalidScreenshot),
    ).rejects.toThrow();
    await expect(
      submitFeedback.execute(feedbackWithValidScreenshot),
    ).resolves.not.toThrow();
  });
});
