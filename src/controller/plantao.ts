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
    const where: Prisma.PlantaoWhereInput = {};

    ctx.body = await prisma.plantao.findMany({
      where,
      include: {
        periodo: true,
        status: true,
        user: true,
        setor: true
      }
    });
  }

  public static async findAllByUser(ctx: Context): Promise<void> {
    const userId = ctx.params.id;
    const where: Prisma.PlantaoWhereInput = {
      user: {
        id: +userId
      }
    };

    ctx.body = await prisma.plantao.findMany({
      where,
      include: {
        periodo: true,
        status: true,
        user: true,
        setor: true,
      }
    });
  }

  public static async findAllByStatus(ctx: Context): Promise<void> {

    const where: Prisma.PlantaoWhereInput = {
      statusID: 2
    };

    ctx.body = await prisma.plantao.findMany({
      where,
      include: {
        periodo: true,
        status: true,
        user: true,
        setor: true,
      }
    });
  }

  public static async recolocarPlantaoById(ctx: Context): Promise<void> {
    const plantaoId = ctx.params.dashBoardPlantoes;
    const userId = ctx.params.id;
    const statusId = 2;
    const updates = ctx.request.body;

    ctx.body = await prisma.plantao.update({
      where: { id: +plantaoId },
      data: {
        userID: +userId,
        statusID: statusId,
        ...updates
      },
    });
  }
  public static async alteradoPlantaoById(ctx: Context): Promise<void> {
    const plantaoId = ctx.params.dashBoardPlantoes;
    const userId = ctx.params.id;
    const statusId = 3;
    const updates = ctx.request.body;

    ctx.body = await prisma.plantao.update({
      where: { id: +plantaoId },
      data: {
        userID: +userId,
        statusID: statusId,
        ...updates
      },
    });
  }

  public static async relatorioFinanceiro(ctx: Context): Promise<void> {
    const query = ctx.request.query;
    const where: Prisma.PlantaoWhereInput = {};
    const startDate: string = "" + query.startDate;
    const endDate: string = "" + query.endDate;

    if (!query.startDate || !query.endDate) {
      ctx.body = "informe a data do relatório";
      return;
    }

    where.statusID = 4;

    where.data = {
      lte: new Date(endDate),
      gte: new Date(startDate),
    };

    const plantoes = await prisma.plantao.groupBy({
      by: ["userID"],
      _count: {
        _all: true,
      },
      _sum: {
        valor: true,
      },
      where,
    });

    const _plantoes = await Promise.all(plantoes.map(async plantao => {
      const user = await prisma.user.findUnique({
        where: {
          id: plantao.userID,
        },
        include: {
          contaBancaria: true
        }
      });

      delete user.password;

      return {
        valor: plantao._sum.valor,
        qt: plantao._count._all,
        user,
      };
    }));

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
