import { z } from 'zod';

export default class UserRegisterValidator {
  static schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1),
    mobile_number: z.string().min(1),
    birth_date: z.string().min(1),
    region: z.string().min(1),
    province: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
  });

  static validate = this.schema.safeParse;
}
