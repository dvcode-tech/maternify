import { z } from 'zod';

export default class CreateJourneyCommentValidator {
  static schema = z.object({
    content: z.string(),
    image: z.string().optional(),
    journeyId: z.number(),
  });

  static validate = this.schema.safeParse;
}
