import CreateJourneyCommentValidator from 'App/Validators/CreateJourneyCommentValidator';
import UpdateJourneyCommentValidator from 'App/Validators/UpdateJourneyCommentValidator';
import { Journey } from 'Database/entities/journey';
import { JourneyComment } from 'Database/entities/journey-comment';
import { User } from 'Database/entities/user';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class JourneyCommentsController {
  static async create(request: Request, response: Response) {
    try {
      const { data, success, error } = CreateJourneyCommentValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const findlUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findlUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'User not found.',
        });
      }

      const findJourney = await Journey.findOne({
        where: {
          id: data.journeyId,
        },
      });

      if (!findJourney) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Journey not found.',
        });
      }

      const commentData: Partial<JourneyComment> = {
        user: findlUser,
        journey: findJourney,
        image: data.image,
        content: data.content,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      await JourneyComment.save(commentData);

      return response.json({
        status: 1,
        message: 'Comment added successfully!',
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
      const { journeyCommentId } = request.params;
      const { data, success, error } = UpdateJourneyCommentValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const { content, image } = data;

      const findJourneyComment = await JourneyComment.findOneBy({
        id: journeyCommentId as unknown as number,
      });

      if (!findJourneyComment) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Journey Comment not found.',
        });
      }

      if (content) {
        findJourneyComment.content = content;
      }

      if (image) {
        findJourneyComment.image = image;
      }

      findJourneyComment.updated_at = Date.now();

      await findJourneyComment.save();

      return response.json({
        status: 1,
        message: 'Journey comment updated successfully!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_by_journey(request: Request, response: Response) {
    try {
      const { journeyId } = request.params;

      const findJourney = await Journey.findOne({
        where: {
          id: journeyId as unknown as number,
        },
      });

      if (!findJourney) {
        response.status(403);
        return response.json({
          status: 0,
          message: 'Forbidden access.',
        });
      }

      const findJourneyComment = await JourneyComment.find({
        where: {
          journey: findJourney,
        },
        relations: {
          user: true,
        },
      });

      return response.json({
        status: 1,
        data: findJourneyComment,
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
