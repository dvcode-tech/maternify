import { PersonnelType } from 'Database/entities/personnel';
import { z } from 'zod';

export default class CreatePersonnelValidator {
  static schema = z.object({
    userId: z.number(),
    locationId: z.number(),
    personnel_type: z.nativeEnum(PersonnelType),
    bio: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
