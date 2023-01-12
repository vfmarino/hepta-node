import { CronJob } from "cron";
import { config } from "./config";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cron = new CronJob(config.cronJobExpression, async () => {
  const where: Prisma.PlantaoWhereInput = {};

  where.statusID = { in: [1, 2, 3,] };

  where.data = {
    lte: new Date(-1),
    gte: new Date(),
  };

  const updatePlantao = await prisma.plantao.update({
    where: {
      
    },
    data: {
      statusID: 4,
    }

  });

  console.log("Executing cron job once every Minutes ");

});

export { cron };