import * as ScheduleValidation from '../controllers/validation/ScheduleValidation.js'
import ScheduleController from '../controllers/ScheduleController.js'
import { isLoggedIn, hasRole } from '../middlewares/AuthMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'
import { checkEntityExists } from '../middlewares/EntityMiddleware.js'
import * as RestaurantMiddleware from '../middlewares/RestaurantMiddleware.js'
import { Schedule, Restaurant } from '../models/models.js'

const loadScheduleRoutes = function (app) {
  app.route('/restaurants/:restaurantId/schedules')
    .get(
      checkEntityExists(Restaurant, 'restaurantId'),
      ScheduleController.indexRestaurant
    )
    .post(
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      RestaurantMiddleware.checkRestaurantOwnership,
      ScheduleValidation.create,
      handleValidation,
      ScheduleController.create
    )

  app.route('/restaurants/:restaurantId/schedules/:scheduleId')
    .put(
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkEntityExists(Schedule, 'scheduleId'),
      RestaurantMiddleware.checkRestaurantOwnership,
      ScheduleValidation.update,
      handleValidation,
      ScheduleController.update
    )
    .delete(
      isLoggedIn,
      hasRole('owner'),
      checkEntityExists(Restaurant, 'restaurantId'),
      checkEntityExists(Schedule, 'scheduleId'),
      RestaurantMiddleware.checkRestaurantOwnership,
      ScheduleController.destroy
    )
}

export default loadScheduleRoutes
