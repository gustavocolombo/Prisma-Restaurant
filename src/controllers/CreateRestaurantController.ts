import { Request, Response } from "express";
import CreateRestaurantService from "../services/CreateRestaurantService";

export default class CreateRestaurantController {
  async handle(request: Request, response: Response) {
    const { name, email, password, telephone, latitude, longitude } =
      request.body;

    const service = new CreateRestaurantService();

    const newRestaurant = await service.execute({
      name,
      email,
      password,
      telephone,
      latitude,
      longitude,
    });

    return response.json(newRestaurant)
  }
}
