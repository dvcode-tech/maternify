import { LocationStatus, LocationType } from 'Database/entities/location';
import { z } from 'zod';

export default class UpdateLocationValidator {
  static schema = z.object({
    name: z.string().optional(),
    location_type: z.nativeEnum(LocationType).optional(),
    status: z.nativeEnum(LocationStatus).optional(),
    mobile_number: z.string().optional(),
    region: z.string().optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
