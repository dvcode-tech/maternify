import { z } from 'zod';

export default class CreateConsultationValidator {
  static schema = z.object({
    content: z.string(),
    userId: z.number(),
  });

  static validate = this.schema.safeParse;
}
