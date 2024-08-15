import UserRegisterValidator from 'App/Validators/UserRegisterValidator';
import UserUpdateValidator from 'App/Validators/UserUpdateValidator';
import { User, UserStatus, UserType } from 'Database/entities/user';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class UsersController {
  static async me(request: Request, response: Response) {
    try {
      const user = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!user) {
        response.status(404);
        return response.json({
          status: 0,
          message: 'User not found.',
        });
      }

      return response.json({
        status: 1,
        data: user,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async register(request: Request, response: Response) {
    const { data, success, error } = UserRegisterValidator.validate(request.body);

    if (!success) {
      response.status(400);
      const { path, message } = error.issues?.[0];

      return response.json({
        status: 0,
        message: `${path?.join('.')}: ${message}`,
      });
    }

    const { email, birth_date, name, city, region, province, address, mobile_number } = data;

    const userData: Partial<User> = {
      principal_id: ic.caller().toText(),
      user_type: UserType.ENDUSER,
      email,
      name,
      birth_date,
      mobile_number,
      province,
      city,
      region,
      address,
      status: 1,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    try {
      const isUserExists = await User.findOne({
        where: [{ email }, { principal_id: ic.caller().toText() }],
      });

      if (isUserExists) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Email/Identity already taken.',
        });
      }

      await User.save(userData);

      return response.json({
        status: 1,
        message: 'Registration success!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async update(request: Request, response: Response) {
    const { data, success, error } = UserUpdateValidator.validate(request.body);

    if (!success) {
      response.status(400);
      const { path, message } = error.issues?.[0];
      return response.json({
        status: 0,
        message: `${path?.join('.')}: ${message}`,
      });
    }

    const { birth_date, name, city, region, province, address, mobile_number } = data;

    try {
      const findUser = await User.findOneBy({ principal_id: ic.caller().toText() });

      if (!findUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'User not found!',
        });
      }

      if (birth_date) {
        findUser.birth_date = birth_date;
      }

      if (name) {
        findUser.name = name;
      }

      if (city) {
        findUser.city = city;
      }

      if (region) {
        findUser.region = region;
      }

      if (province) {
        findUser.province = province;
      }

      if (address) {
        findUser.address = address;
      }

      if (mobile_number) {
        findUser.mobile_number = mobile_number;
      }

      findUser.updated_at = Date.now();

      await findUser.save();

      return response.json({
        status: 1,
        message: 'User updated successfully!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_info_of_user_by_public(request: Request, response: Response) {
    try {
      const { uid } = request.params;

      const user = await User.findOneBy({
        id: Number(uid),
        status: UserStatus.ACTIVE,
      });

      if (!user) {
        response.status(404);
        return response.json({
          status: 0,
          message: 'User not found.',
        });
      }

      return response.json({
        status: 1,
        data: user,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_info_of_user_by_qr(request: Request, response: Response) {
    try {
      const { principal_id } = request.body;

      const user = await User.findOneBy({
        principal_id: principal_id,
        status: UserStatus.ACTIVE,
      });

      if (!user) {
        response.status(404);
        return response.json({
          status: 0,
          message: 'User not found.',
        });
      }

      return response.json({
        status: 1,
        data: user,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }
}
