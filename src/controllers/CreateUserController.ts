import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

export default class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, telephone, dateBirthday } = request.body;

    const service = new CreateUserService();

    const newUser = await service.execute({
      name,
      email,
      password,
      telephone,
      dateBirthday,
    });

    return response.json(newUser);
  }
}
