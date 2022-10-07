"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../prismaClient");
const resolvers = {
    Query: {
        mainCategories() {
            return __awaiter(this, void 0, void 0, function* () {
                const mainCategories = yield prismaClient_1.prisma.mainCategory.findMany({
                    orderBy: {
                        id: "asc"
                    }
                });
                return mainCategories;
            });
        },
        plans(parent, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { category } = args;
                const query = `SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${category} ORDER BY price ASC`;
                const mainCategories = yield prismaClient_1.prisma.mainCategory.findMany({
                    orderBy: {
                        id: "desc"
                    }
                });
                const plans = yield prismaClient_1.prisma.$queryRawUnsafe(query);
                let categories = [];
                plans && plans.map((plan) => {
                    if (plan.categoryId && plan.categoryLabel && plan.categoryName) {
                        const obj = {
                            id: plan.categoryId,
                            label: plan.categoryLabel,
                            name: plan.categoryName,
                        };
                        const exists = categories.find((cat) => cat.id === plan.id);
                        if (!exists)
                            categories.push(obj);
                    }
                });
                return {
                    plans,
                    mainCategories,
                    categories
                };
            });
        },
        plansByName(parent, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { categoryName } = args;
                console.log("categoryName: " + categoryName);
                let plans = [];
                let categories = [];
                const mainCategory = yield prismaClient_1.prisma.mainCategory.findFirst({
                    where: {
                        OR: [
                            {
                                altName: categoryName
                            },
                            {
                                internalName: categoryName
                            }
                        ]
                    }
                });
                if (mainCategory) {
                    console.log(mainCategory);
                    const query = `SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${mainCategory.id} ORDER BY price ASC`;
                    console.log(query);
                    plans = yield prismaClient_1.prisma.$queryRawUnsafe(query);
                    plans && plans.map((plan) => {
                        if (plan.categoryId && plan.categoryLabel && plan.categoryName) {
                            const obj = {
                                id: plan.categoryId,
                                label: plan.categoryLabel,
                                name: plan.categoryName,
                            };
                            const exists = categories.find((cat) => cat.id === plan.id);
                            if (!exists)
                                categories.push(obj);
                        }
                    });
                }
                return {
                    plans,
                    mainCategory,
                    categories
                };
            });
        }
    }
};
exports.default = resolvers;
