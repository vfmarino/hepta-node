import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class MotivoDeTrocaController {

  public static async create(ctx: Context): Promise<void> {
    const motivo = await prisma.motivoDeTroca.create({
      data: ctx.request.body
    });

    ctx.body = motivo;
  }

  public static async findAll(ctx: Context): Promise<void> {
    ctx.body = await prisma.motivoDeTroca.findMany();
  }

}