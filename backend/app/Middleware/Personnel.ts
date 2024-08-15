import { User, UserType } from 'Database/entities/user';
import { ic } from 'azle';
import { NextFunction, Request, Response } from 'express';

export default async function isPersonnel(request: Request, response: Response, next: NextFunction) {
  if (ic.caller().isAnonymous()) {
    response.status(401);
    return response.json({
      status: 0,
      message: 'Unauthorized user!',
    });
  }

  const findPersonnelUser = await User.findOneBy({
    principal_id: ic.caller().toText(),
  });

  if (!findPersonnelUser) {
    response.status(400);
    return response.json({
      status: 0,
      message: 'User not found.',
    });
  }

  if (findPersonnelUser.user_type !== UserType.PERSONNEL) {
    response.status(401);
    return response.json({
      status: 0,
      message: 'Forbidden user!',
    });
  } else {
    next();
  }
}
