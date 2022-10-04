import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const resolvers = {
    Query: {
        plans(parent: any, args: any, context: any, info: any) {
            return prisma.plan.findMany();
        }
    }
}

export default resolvers;