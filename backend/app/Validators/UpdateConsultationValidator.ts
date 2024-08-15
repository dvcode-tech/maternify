import { z } from 'zod';

export default class UpdateConsultationValidator {
  static schema = z.object({
    content: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
