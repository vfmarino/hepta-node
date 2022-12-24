import { Context } from "koa";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default class UserController {
  public static async create(ctx: Context): Promise<void> {

    const {password: _password, ...userData} = ctx.request.body;

    const password = await bcrypt.hash(_password, 5);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password
      }
    });

    ctx.body = user;
  }

  public static async createMedico(ctx: Context): Promise<void> {
    const {
      nome,
      username,
      password: _password,
      cpf,
      especialidade,
      telefone,
      contaBancaria,
      hospitaisid,
    } =  ctx.request.body;

    const password = await bcrypt.hash(_password, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        username,
        password,
        cpf,
        especialidade,
        telefone,
        hospital: {
          connect: { id_hospitais: hospitaisid}
        },
        contaBancaria: {
          create: { ...contaBancaria, cpf }
        }
      },
      include: {
        contaBancaria: true,
        hospital: true
      }
    });

    ctx.body = user;
  }

  public static async findAll(ctx: Context): Promise<void> {
    const where: Prisma.UserWhereInput  =  {};
    const query = ctx.request.query;

    if (query.id_user) {
      where.id_user = +query.id_user;
    }

    if (query.telefone) {
      where.telefone = query.telefone as string;
    }

    if (query.nome) {
      where.nome = query.nome as string;
    }

    if (query.cpf) {
      where.cpf = query.cpf as string;
    }

    if (query.username) {
      where.username = query.username as string;
    }

    if (query.especialidade) {
      where.especialidade = query.especialidade as string;
    }

    ctx.body = await prisma.user.findMany({
      where
    });
  }

  public static async findOne(ctx: Context): Promise<void> {
    const id: number = +ctx.params.id;
    ctx.body = await prisma.user.findUnique({
      where: {
        id_user: +id
      }
    });
  }

  public static async delete(ctx: Context): Promise<void> {
    const id: number = +ctx.params.id;
    ctx.body = await prisma.user.delete({
      where: {
        id_user: +id
      }
    });
  }
}
