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
        plans(parent, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { category } = args;
                const query = `SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${category} ORDER BY price ASC`;
                const mainCategories = yield prismaClient_1.prisma.mainCategory.findMany();
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
                // let mainCats: any[] = [];
                // mainCategories && mainCategories.map(async (mainCategory) => {
                //     const thePlans = await prisma.plan.findMany({
                //         where: {
                //             category: mainCategory.id
                //         }
                //     })
                //     const obj = {
                //         mainCategory,
                //     }
                //     mainCats.push(obj)
                // })
                // console.log(mainCats)
                // const url = `SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" IN (${mainIds}) ORDER BY price ASC`;
                // const plans: any[] = [];
                // let cats: any[] = [];
                // plans && plans.map((plan: PlanType) => {
                //     if (plan.categoryId && plan.categoryLabel && plan.categoryName) {
                //         const obj = {
                //             id: plan.categoryId,
                //             label: plan.categoryLabel,
                //             name: plan.categoryName,
                //         };
                //         const exists = cats.find((cat) => cat.id === plan.id);
                //         if (!exists) cats.push(obj);
                //     }
                // })
                // return {
                //     mainCategories: mainCats
                // };
            });
        }
    }
};
exports.default = resolvers;
