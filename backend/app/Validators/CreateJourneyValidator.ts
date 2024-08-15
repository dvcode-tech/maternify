import { z } from 'zod';

export default class CreateJourneyValidator {
  static schema = z.object({
    image: z.string().optional(),
    content: z.string(),
  });

  static validate = this.schema.safeParse;
}
