import { Configuration } from './configuration';
import { User } from './user';
import { Feedback } from './feedback';
import { Notification } from './notification';
import { Location } from './location';
import { Personnel } from './personnel';
import { Journey } from './journey';
import { JourneyComment } from './journey-comment';
import { Consultation } from './consultation';
import { ConsultationComment } from './consultation-comment';

export const ENTITIES = [
  User,
  Location,
  Personnel,
  Configuration,
  Feedback,
  Notification,
  Journey,
  JourneyComment,
  Consultation,
  ConsultationComment,
];
