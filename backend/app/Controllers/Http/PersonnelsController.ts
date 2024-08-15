import CreatePersonnelValidator from 'App/Validators/CreatePersonnelValidator';
import UpdatePersonnelValidator from 'App/Validators/UpdatePersonnelValidator';
import { Location, LocationStatus } from 'Database/entities/location';
import { Personnel, PersonnelStatus } from 'Database/entities/personnel';
import { User, UserType } from 'Database/entities/user';
import { Response, Request } from 'express';

export default class PersonnelsController {
  static async create(request: Request, response: Response) {
    try {
      const { data, success, error } = CreatePersonnelValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const findLocation = await Location.findOneBy({
        id: data.locationId,
      });

      if (!findLocation) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Location doesnt exists.',
        });
      }

      const findUser = await User.findOneBy({
        id: data.userId,
      });

      if (!findUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'User doesnt exists.',
        });
      }

      const checkPersonnelExists = await Personnel.findOneBy({ user: findUser });

      if (checkPersonnelExists) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Personnel already exists.',
        });
      }

      const personnelData: Partial<Personnel> = {
        user: findUser,
        personnel_type: data.personnel_type,
        bio: data?.bio,
        location: findLocation,
        status: PersonnelStatus.ACTIVE,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      await Personnel.save(personnelData);

      findUser.user_type = UserType.PERSONNEL;

      await findUser.save();

      return response.json({
        status: 1,
        message: 'Personnel added successfully!',
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
    try {
      const { personnelId } = request.params;
      const { data, success, error } = UpdatePersonnelValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const { bio, locationId } = data;

      const findPersonnel = await Personnel.findOneBy({
        id: personnelId as unknown as number,
      });

      if (!findPersonnel) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Personnel not found.',
        });
      }

      if (bio) {
        findPersonnel.bio = bio;
      }

      if (locationId) {
        const findLocation = await Location.findOneBy({
          id: locationId as unknown as number,
        });

        if (!findLocation) {
          response.status(400);
          return response.json({
            status: 0,
            message: 'Location not found.',
          });
        }

        findPersonnel.location = findLocation;
      }

      findPersonnel.updated_at = Date.now();

      await findPersonnel.save();

      return response.json({
        status: 1,
        message: 'Personnel updated successfully!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view(request: Request, response: Response) {
    try {
      const { personnelId } = request.params;

      const findPersonnel = await Personnel.findOne({
        where: {
          id: personnelId as unknown as number,
        },
        relations: {
          user: true,
          location: true,
        },
      });

      return response.json({
        status: 1,
        data: findPersonnel,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_by_admin(request: Request, response: Response) {
    try {
      const findPersonnels = await Personnel.find({
        relations: {
          user: true,
          location: true,
        },
      });

      return response.json({
        status: 1,
        data: findPersonnels,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_by_user(request: Request, response: Response) {
    try {
      const findPersonnels = await Personnel.find({
        where: { status: PersonnelStatus.ACTIVE },
        relations: {
          user: true,
          location: true,
        },
      });

      return response.json({
        status: 1,
        data: findPersonnels,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_by_location(request: Request, response: Response) {
    const { locationId } = request.params;

    try {
      const findLocation = await Location.findOne({
        where: {
          status: LocationStatus.SHOWN,
          id: locationId as unknown as number,
        },
      });

      if (!findLocation) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Location not found.',
        });
      }

      const findPersonnels = await Personnel.find({
        where: {
          id: locationId as unknown as number,
          location: findLocation,
        },
        relations: {
          user: true,
          location: true,
        },
      });

      return response.json({
        status: 1,
        data: findPersonnels,
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
