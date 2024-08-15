import { z } from 'zod';

export default class UpdateConsultationCommentValidator {
  static schema = z.object({
    content: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
