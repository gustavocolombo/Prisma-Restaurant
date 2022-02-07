import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import prismaClient from "../prisma";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  telephone: string;
  dateBirthday: Date;
}

export default class CreateUserService{
  async execute({
    name,
    email,
    password,
    telephone,
    dateBirthday,
  }: ICreateUser): Promise<User> {
    let user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
  
    if (!user) {
      const hashedPassword = await hash(password, 8);
  
      user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          telephone,
          dateBirthday,
        },
      });
    }else{
      throw new Error('Usuário com credenciais já existentes')
    }
  
    return user;
  }
}