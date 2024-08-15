import CreateJourneyValidator from 'App/Validators/CreateJourneyValidator';
import UpdateJourneyValidator from 'App/Validators/UpdateJourneyValidator';
import { Journey } from 'Database/entities/journey';
import { User } from 'Database/entities/user';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class JourneysController {
  static async create(request: Request, response: Response) {
    try {
      const { data, success, error } = CreateJourneyValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const findUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'User not found.',
        });
      }

      const locationData: Partial<Journey> = {
        user: findUser,
        image: data.image,
        content: data.content,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      await Journey.save(locationData);

      return response.json({
        status: 1,
        message: 'Journey created successfully!',
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
      const { journeyId } = request.params;
      const { data, success, error } = UpdateJourneyValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const { content, image } = data;

      const findJourney = await Journey.findOneBy({
        id: journeyId as unknown as number,
      });

      if (!findJourney) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Journey not found.',
        });
      }

      if (content) {
        findJourney.content = content;
      }

      if (image) {
        findJourney.image = image;
      }

      findJourney.updated_at = Date.now();

      await findJourney.save();

      return response.json({
        status: 1,
        message: 'Journey updated successfully!',
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
      const { journeyId } = request.params;

      const findJourney = await Journey.findOne({
        where: {
          id: journeyId as unknown as number,
        },
        relations: {
          user: true,
          comments: {
            user: true,
          },
        },
      });

      return response.json({
        status: 1,
        data: findJourney,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_of_user(request: Request, response: Response) {
    try {
      const { uid } = request.params;

      const findUser = await User.findOneBy({
        id: uid as unknown as number,
      });

      if (!findUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'User not found.',
        });
      }

      const findJourneys = await Journey.find({
        where: {
          user: findUser,
        },
        relations: {
          user: true,
        },
      });

      return response.json({
        status: 1,
        data: findJourneys,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_feed(request: Request, response: Response) {
    try {
      const page = parseInt(request.query.page as string, 10) || 1;
      const pageSize = parseInt(request.query.pageSize as string, 10) || 10;

      const [journeys, total] = await Journey.findAndCount({
        relations: {
          user: true,
        },
        order: {
          created_at: 'DESC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return response.json({
        status: 1,
        data: {
          data: journeys,
          total,
          page,
          pageSize,
        },
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
