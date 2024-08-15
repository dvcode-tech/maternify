import CreateLocationValidator from 'App/Validators/CreateLocationValidator';
import UpdateLocationValidator from 'App/Validators/UpdateLocationValidator';
import { Location, LocationStatus, LocationType } from 'Database/entities/location';
import { Response, Request } from 'express';

export default class LocationsController {
  static async create(request: Request, response: Response) {
    try {
      const { data, success, error } = CreateLocationValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const findLocation = await Location.findOneBy({
        name: data.name,
      });

      if (findLocation) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Location name already exists.',
        });
      }

      const locationData: Partial<Location> = {
        ...data,
        status: LocationStatus.SHOWN,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      await Location.save(locationData);

      return response.json({
        status: 1,
        message: 'Location created successfully!',
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
      const { locationId } = request.params;
      const { data, success, error } = UpdateLocationValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const { name, location_type, mobile_number, region, province, city, address, status } = data;

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

      if (name) {
        findLocation.name = name;
      }

      if (mobile_number) {
        findLocation.mobile_number = mobile_number;
      }

      if (region) {
        findLocation.region = region;
      }

      if (province) {
        findLocation.province = province;
      }

      if (city) {
        findLocation.city = city;
      }

      if (address) {
        findLocation.address = address;
      }

      if (location_type || location_type === LocationType.LYING_IN) {
        findLocation.location_type = location_type;
      }

      if (status || status === LocationStatus.HIDDEN) {
        findLocation.status = status;
      }

      findLocation.updated_at = Date.now();

      await findLocation.save();

      return response.json({
        status: 1,
        message: 'Location updated successfully!',
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
      const { locationId } = request.params;

      const findLocations = await Location.findOne({
        where: {
          id: locationId as unknown as number,
        },
        relations: {
          personnels: {
            user: true,
          },
        },
      });

      return response.json({
        status: 1,
        data: findLocations,
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
      const findLocations = await Location.find();

      return response.json({
        status: 1,
        data: findLocations,
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
      const findLocations = await Location.find({
        where: { status: LocationStatus.SHOWN },
      });

      return response.json({
        status: 1,
        data: findLocations,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_by_type_city(request: Request, response: Response) {
    const { city, location_type } = request.query;

    try {
      const findLocations = await Location.find({
        where: {
          status: LocationStatus.SHOWN,
          city: city as string,
          location_type: location_type as unknown as LocationType,
        },
        relations: {
          personnels: {
            user: true,
          },
        },
      });

      return response.json({
        status: 1,
        data: findLocations,
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
