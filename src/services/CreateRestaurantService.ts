import { Restaurant } from "@prisma/client";
import { hash } from "bcryptjs";
import prismaClient from "../prisma";

interface ICreateRestaurant {
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  telephone: string;
}

export default class CreateRestaurantService {
  async execute({
    name,
    email,
    password,
    latitude,
    longitude,
    telephone,
  }: ICreateRestaurant): Promise<Restaurant> {
    try {
      let restaurant = await prismaClient.restaurant.findUnique({
        where: { email: email },
      });

      if (!restaurant) {
        const hashedPass = await hash(password, 8);

        restaurant = await prismaClient.restaurant.create({
          data: {
            name,
            email,
            password: hashedPass,
            latitude,
            longitude,
            telephone,
          },
        });

      } else {
        throw new Error("Restaurant com credenciais já cadastradas");
      }

      return restaurant;
    } catch (error) {
      throw new Error("Falha ao cadastrar restaurante");
    }
  }
}
