"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const resolvers = {
    Query: {
        plans(parent, args, context, info) {
            return prisma.plan.findMany();
        }
    }
};
exports.default = resolvers;
