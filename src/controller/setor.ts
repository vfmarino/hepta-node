import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class SetoresController {
  
public static async findAll(ctx: Context): Promise<void> {
    ctx.body = await prisma.setores.findMany();
  }
 


}