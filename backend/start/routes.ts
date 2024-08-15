import { Router } from 'express';

import ApisController from 'App/Controllers/Http/ApisController';
import UsersController from 'App/Controllers/Http/UsersController';

import isAuth from 'App/Middleware/Auth';
import isPersonnel from 'App/Middleware/Personnel';
import PersonnelsController from 'App/Controllers/Http/PersonnelsController';
import isAdmin from 'App/Middleware/Admin';
import LocationsController from 'App/Controllers/Http/LocationsController';
import JourneysController from 'App/Controllers/Http/JourneysController';
import JourneyCommentsController from 'App/Controllers/Http/JourneyCommentsValidator';
import ConsultationsController from 'App/Controllers/Http/ConsultationsController';
import ConsultationCommentsController from 'App/Controllers/Http/ConsultationCommentsController';

const Route = Router();

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

// USER
Route.get('/user/me', isAuth, UsersController.me);
Route.post('/user/register', isAuth, UsersController.register);
Route.post('/user/update', isAuth, UsersController.update);
Route.get('/user/:uid/info', isAuth, UsersController.view_info_of_user_by_public);

// PERSONNEL
Route.get('/personnel/view/:personnelId', isAuth, PersonnelsController.view);
Route.get('/personnel/viewall', isAuth, PersonnelsController.view_all_by_user);
Route.get('/personnel/location/:locationId/viewall', isAuth, PersonnelsController.view_all_by_location);

// LOCATION
Route.get('/location/view/:locationId', isAuth, LocationsController.view);
Route.get('/location/viewall', isAuth, LocationsController.view_all_by_user);
Route.get('/location/search', isAuth, LocationsController.view_all_by_type_city);

// JOURNEY
Route.post('/journey/create', isAuth, JourneysController.create);
Route.post('/journey/update/:journeyId', isAuth, JourneysController.update);
Route.get('/journey/view/:journeyId', isAuth, JourneysController.view);
Route.get('/journey/user/:uid/viewall', isAuth, JourneysController.view_all_of_user);
Route.get('/journey/feed', isAuth, JourneysController.view_all_feed);

// JOURNEY COMMENTS
Route.post('/journeycomment/create', isAuth, JourneyCommentsController.create);
Route.post('/journeycomment/update/:journeyCommentId', isAuth, JourneyCommentsController.update);
Route.get('/journeycomment/journey/:journeyId/viewall', isAuth, JourneyCommentsController.view_by_journey);

// CONSULTATION
Route.get('/consultation/viewall', isAuth, ConsultationsController.view_all_by_patient);
Route.get('/consultation/view/:consultationId', isAuth, ConsultationsController.view);

// JOURNEY COMMENTS
Route.post('/consultationcomment/create', isAuth, ConsultationCommentsController.create);
Route.post('/consultationcomment/update/:consultationCommentId', isAuth, ConsultationCommentsController.update);
Route.get(
  '/consultationcomment/consultation/:consultationId/viewall',
  isAuth,
  ConsultationCommentsController.view_by_consultation,
);

/*
|--------------------------------------------------------------------------
| Personnel Routes
|--------------------------------------------------------------------------
*/

Route.post('/personnel/scan', isPersonnel, UsersController.view_info_of_user_by_qr);

// CONSULTATION
Route.post('/personnel/consultation/create', isPersonnel, ConsultationsController.create);
Route.post('/personnel/consultation/update/:consultationId', isPersonnel, ConsultationsController.update);
Route.get('/personnel/consultation/view/:consultationId', isPersonnel, ConsultationsController.view);
Route.get(
  '/personnel/consultation/user/:uid/viewall',
  isPersonnel,
  ConsultationsController.view_all_of_user_by_personnel,
);
Route.get('/personnel/consultation/viewall', isPersonnel, ConsultationsController.view_all_by_personnel);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// PERSONNEL
Route.post('/admin/personnel/create', isAdmin, PersonnelsController.create);
Route.post('/admin/personnel/update/:personnelId', isAdmin, PersonnelsController.update);
Route.get('/admin/personnel/viewall', isAdmin, PersonnelsController.view_all_by_admin);

// LOCATION
Route.post('/admin/location/create', isAdmin, LocationsController.create);
Route.post('/admin/location/update/:locationId', isAdmin, LocationsController.update);
Route.get('/admin/location/viewall', isAdmin, LocationsController.view_all_by_admin);
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route.get('/health', ApisController.health);
Route.post('/init', ApisController.init);
Route.get('/config', ApisController.config);

Route.get('/uploads/:filename', ApisController.readupload);
Route.post('/upload', isAuth, ApisController.testupload);
Route.get('/uploads/v2/:filename', ApisController.readupload_v2);

export { Route as routes };
