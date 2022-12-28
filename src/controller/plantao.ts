import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class PlantaoController {
  public static async create(ctx: Context): Promise<void> {
    const plantao = await prisma.plantao.create({
      data: ctx.request.body
    });

    ctx.body = plantao;
  }

  public static async findAll(ctx: Context): Promise<void> {
    ctx.body = "findAll";
  }

  public static async findOne(ctx: Context): Promise<void> {
    ctx.body = "findOne";
  }

  public static async delete(ctx: Context): Promise<void> {
    ctx.body = "delete";
  }
}
