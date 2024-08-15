import { LocationType } from 'Database/entities/location';
import { z } from 'zod';

export default class CreateLocationValidator {
  static schema = z.object({
    name: z.string().min(1),
    location_type: z.nativeEnum(LocationType),
    mobile_number: z.string().optional(),
    region: z.string().min(1),
    province: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
  });

  static validate = this.schema.safeParse;
}
