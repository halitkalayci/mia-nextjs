import { PrismaClient } from "@prisma/client";

// TODO: Implement singleton pattern.
let prisma: PrismaClient;

prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  const modelsWithSofDelete = ["Category"];

  if (params.action.startsWith("find")) {
    if (!params.args) params.args = {};
    if (!params.args.where) params.args.where = {};

    if (modelsWithSofDelete.includes(params.model!))
      params.args.where.deletedDate = null;
  }

  return next(params);
});

export default prisma;
