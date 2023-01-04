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
  
  
    ctx.body = await prisma.plantao.findMany({
      where,
      include: {
        periodo: true,
        status: true,
        user: true,
        setor:true
  
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
      _count: {
        _all: true,
      },
      _sum: {
        valor: true,
      },
    });

    const _plantoes = plantoes.map(plantao => {
      return {
        userId: plantao.userID,
        valor: plantao._sum.valor,
        qt: plantao._count._all
      };
    });

    ctx.body = _plantoes;
  }

  public static async findOne(ctx: Context): Promise<void> {
    const id: number = +ctx.params.id;

    ctx.body = await prisma.plantao.findUnique({
      where: {
        id: id,
      }
    });
  }

  public static async delete(ctx: Context): Promise<void> {
    ctx.body = "delete";
  }
}
