import { z } from 'zod';

export default class CreateConsultationCommentValidator {
  static schema = z.object({
    content: z.string(),
    consultationId: z.number(),
  });

  static validate = this.schema.safeParse;
}
