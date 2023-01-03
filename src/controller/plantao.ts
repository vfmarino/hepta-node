import { Context } from "koa";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class PlantaoController {
  public static async create(ctx: Context): Promise<void> {
    const plantao = await prisma.plantao.create({
      data: ctx.request.body
    });

    ctx.body = plantao;
  }

  public static async findAll(ctx: Context): Promise<void> {
    const query = ctx.request.query;
    const where: Prisma.PlantaoWhereInput = {};

    if (query.userID) {
      where.userID = +query.userID;
    }
    if (query.status) {
      where.statusID = +query.status;
    }

    ctx.body = await prisma.plantao.findMany({
      where,
      include: {
        valor: true,
        status: true,
        user: true,


      }
    });
  }

  public static async relatorioFinanceiro(ctx: Context): Promise<void> {
    const query = ctx.request.query;
    const where: Prisma.PlantaoWhereInput = {};

    if (query.status) {
      where.statusID = +query.status;
    }

    const plantoes = await prisma.plantao.groupBy({
      by: ["userID"],
      where,
    });

    ctx.body = {
      plantoes,
      valor: 100,
      qt: plantoes.length
    };
  }

  public static async findOne(ctx: Context): Promise<void> {
    const id: number = +ctx.params.id;

    ctx.body = await prisma.plantao.findUnique({
      where: {
        id: id
      }
    });
  }

  public static async delete(ctx: Context): Promise<void> {
    ctx.body = "delete";
  }
}
