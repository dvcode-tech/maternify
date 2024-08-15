import { User } from 'Database/entities/user';
import { ic } from 'azle';
import { NextFunction, Request, Response } from 'express';

export const adminEmail = 'hello@dvcode.tech';

export default async function isAdmin(request: Request, response: Response, next: NextFunction) {
  if (ic.caller().isAnonymous()) {
    response.status(401);
    return response.json({
      status: 0,
      message: 'Unauthorized user!',
    });
  }

  const findAdminUser = await User.findOneBy({
    principal_id: ic.caller().toText(),
  });

  if (!findAdminUser) {
    response.status(400);
    return response.json({
      status: 0,
      message: 'User not found.',
    });
  }

  if (findAdminUser.email !== adminEmail) {
    response.status(401);
    return response.json({
      status: 0,
      message: 'Forbidden user!',
    });
  } else {
    next();
  }
}
