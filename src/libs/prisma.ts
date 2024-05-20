import { PrismaClient } from "@prisma/client";


// TODO: Implement singleton pattern.
let prisma: PrismaClient;

prisma = new PrismaClient();

export default prisma;
