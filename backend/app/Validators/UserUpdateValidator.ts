import { z } from 'zod';

export default class UserUpdateValidator {
  static schema = z.object({
    name: z.string().optional(),
    mobile_number: z.string().optional(),
    birth_date: z.string().optional(),
    region: z.string().optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
  });

  static validate = this.schema.safeParse;
}
