import { z } from 'zod';

export default class UpdatePersonnelValidator {
  static schema = z.object({
    locationId: z.number().optional(),
    bio: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
