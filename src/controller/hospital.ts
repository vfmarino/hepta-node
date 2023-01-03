import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class HospitalController {

  public static async create(ctx: Context): Promise<void> {
    const hospital = await prisma.hospital.create({
      data: ctx.request.body
    });

    ctx.body = hospital;
  }

  public static async findAll(ctx: Context): Promise<void> {
    ctx.body = await prisma.hospital.findMany();
  }

  public static async findOne(ctx: Context): Promise<void> {
    const id: number = +ctx.params.id;
    ctx.body = await prisma.hospital.findUnique({
      where: {
        id: +id
      }
    });
  }

  public static async delete(ctx: Context): Promise<void> {
    const id: number = +ctx.params.id;
    ctx.body = await prisma.hospital.delete({
      where: {
        id: +id
      }
    });
  }
}
