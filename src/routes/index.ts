import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import CreateUserController from "../controllers/CreateUserController";

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

export default routes;
