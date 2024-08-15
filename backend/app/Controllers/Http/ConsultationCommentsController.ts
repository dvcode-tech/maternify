import CreateConsultationCommentValidator from 'App/Validators/CreateConsultationCommentValidator';
import UpdateConsultationCommentValidator from 'App/Validators/UpdateConsultationCommentValidator';
import { Consultation } from 'Database/entities/consultation';
import { ConsultationComment } from 'Database/entities/consultation-comment';
import { User } from 'Database/entities/user';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class ConsultationCommentsController {
  static async create(request: Request, response: Response) {
    try {
      const { data, success, error } = CreateConsultationCommentValidator.validate(request.body);

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

      const findConsultation = await Consultation.findOne({
        where: [
          {
            id: data.consultationId,
            personnel: findlUser,
          },
          {
            id: data.consultationId,
            patient: findlUser,
          },
        ],
      });

      if (!findConsultation) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Consultation not found.',
        });
      }

      const commentData: Partial<ConsultationComment> = {
        user: findlUser,
        consultation: findConsultation,
        content: data.content,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      await ConsultationComment.save(commentData);

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
      const { consultationCommentId } = request.params;
      const { data, success, error } = UpdateConsultationCommentValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const { content } = data;

      const findConsultationComment = await ConsultationComment.findOneBy({
        id: consultationCommentId as unknown as number,
      });

      if (!findConsultationComment) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Consultation Comment not found.',
        });
      }

      if (content) {
        findConsultationComment.content = content;
      }

      findConsultationComment.updated_at = Date.now();

      await findConsultationComment.save();

      return response.json({
        status: 1,
        message: 'Consultation comment updated successfully!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_by_consultation(request: Request, response: Response) {
    try {
      const { consultationId } = request.params;

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

      const findConsultation = await Consultation.findOne({
        where: [
          {
            id: consultationId as unknown as number,
            personnel: findlUser,
          },
          {
            id: consultationId as unknown as number,
            patient: findlUser,
          },
        ],
      });

      if (!findConsultation) {
        response.status(403);
        return response.json({
          status: 0,
          message: 'Forbidden access.',
        });
      }

      const findConsultationComment = await ConsultationComment.find({
        where: {
          consultation: findConsultation,
        },
        relations: {
          user: true,
        },
      });

      return response.json({
        status: 1,
        data: findConsultationComment,
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
