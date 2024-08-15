import { z } from 'zod';

export default class UpdateJourneyValidator {
  static schema = z.object({
    image: z.string().optional(),
    content: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
