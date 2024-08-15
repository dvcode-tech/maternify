import CreateConsultationValidator from 'App/Validators/CreateConsultationValidator';
import UpdateConsultationValidator from 'App/Validators/UpdateConsultationValidator';
import { Consultation } from 'Database/entities/consultation';
import { User } from 'Database/entities/user';
import { ic } from 'azle';
import { Response, Request } from 'express';

export default class ConsultationsController {
  static async create(request: Request, response: Response) {
    try {
      const { data, success, error } = CreateConsultationValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const findPersonnelUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findPersonnelUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Personnel User not found.',
        });
      }

      const findPatientUser = await User.findOneBy({
        id: data.userId,
      });

      if (!findPatientUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Patient User not found.',
        });
      }

      const locationData: Partial<Consultation> = {
        patient: findPatientUser,
        personnel: findPersonnelUser,
        content: data.content,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      await Consultation.save(locationData);

      return response.json({
        status: 1,
        message: 'Consultation created successfully!',
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
      const { consultationId } = request.params;
      const { data, success, error } = UpdateConsultationValidator.validate(request.body);

      if (!success) {
        response.status(400);
        const { path, message } = error.issues?.[0];

        return response.json({
          status: 0,
          message: `${path?.join('.')}: ${message}`,
        });
      }

      const { content } = data;

      const findConsultation = await Consultation.findOneBy({
        id: consultationId as unknown as number,
      });

      if (!findConsultation) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Consultation not found.',
        });
      }

      if (content) {
        findConsultation.content = content;
      }

      findConsultation.updated_at = Date.now();

      await findConsultation.save();

      return response.json({
        status: 1,
        message: 'Consultation updated successfully!',
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

      const findConsultations = await Consultation.findOne({
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
        relations: {
          personnel: {
            personnel: true,
          },
          patient: true,
          comments: {
            user: true,
          },
        },
      });

      return response.json({
        status: 1,
        data: findConsultations,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_of_user_by_personnel(request: Request, response: Response) {
    try {
      const { uid } = request.params;

      const findPersonnelUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findPersonnelUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Personnel not found.',
        });
      }

      const findPatientUser = await User.findOneBy({
        id: uid as unknown as number,
      });

      if (!findPatientUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Patient not found.',
        });
      }

      const findConsultations = await Consultation.find({
        where: {
          patient: findPatientUser,
          personnel: findPersonnelUser,
        },
        relations: {
          patient: true,
          personnel: {
            personnel: true,
          },
        },
      });

      return response.json({
        status: 1,
        data: findConsultations,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_by_personnel(request: Request, response: Response) {
    try {
      const findPersonnelUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findPersonnelUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Personnel not found.',
        });
      }

      const findConsultations = await Consultation.find({
        where: {
          personnel: findPersonnelUser,
        },
        relations: {
          patient: true,
          personnel: {
            personnel: true,
          },
        },
      });

      return response.json({
        status: 1,
        data: findConsultations,
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  static async view_all_by_patient(request: Request, response: Response) {
    try {
      const findPatientUser = await User.findOneBy({
        principal_id: ic.caller().toText(),
      });

      if (!findPatientUser) {
        response.status(400);
        return response.json({
          status: 0,
          message: 'Patient not found.',
        });
      }

      const findConsultations = await Consultation.find({
        where: {
          patient: findPatientUser,
        },
        relations: {
          patient: true,
          personnel: {
            personnel: true,
          },
        },
      });

      return response.json({
        status: 1,
        data: findConsultations,
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
