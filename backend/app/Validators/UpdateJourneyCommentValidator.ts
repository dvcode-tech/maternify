import { z } from 'zod';

export default class UpdateJourneyCommentValidator {
  static schema = z.object({
    content: z.string(),
    image: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
