import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import CreateUserController from "../controllers/CreateUserController";
import CreateRestaurantController from "../controllers/CreateRestaurantController";

const routes = Router();

routes.post(
  "/user",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(8).required(),
      telephone: Joi.string().required(),
      dateBirthday: Joi.string().isoDate().required(),
    }),
  }),
  new CreateUserController().handle
);

routes.post(
  "/restaurant",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(8),
      latitude: Joi.number(),
      longitude: Joi.number(),
      telephone: Joi.string().required(),
    }),
  }),
  new CreateRestaurantController().handle
);

export default routes;
