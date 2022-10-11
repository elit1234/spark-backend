import { PlanType } from "../../global";
import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";


const resolvers = {
    Query: {
        async getCategories(_parent: any, args: any, _context: any, _info: any) {
            const { mainCat }: { mainCat: string; } = args;

            const mainCategory = await prisma.mainCategory.findFirst({
                where: {
                    OR: [
                        {
                            altName: mainCat
                        },
                        {
                            internalName: mainCat
                        }
                    ]
                }
            })
            const categories = await prisma.category.findMany({
                where: {
                    mainCatId: mainCategory?.id
                }
            })
            return categories
        },
        async mainCategories() {
            const mainCategories = await prisma.mainCategory.findMany({
                orderBy: {
                    id: "asc"
                }
            });
            return mainCategories
        },
        async plansByName(parent: any, args: any, context: any, info: any) {
            const { categoryName, categoryId } = args;
            let plans: PlanType[] | null = [];
            let categories: any[] = [];

            const mainCategory = await prisma.mainCategory.findFirst({
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
            })!
            if (mainCategory) {
                let query: any = "";
                if (Number(categoryId)) {
                    query = Prisma.sql`SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${mainCategory.id} AND C."categoryId" = ${categoryId} ORDER BY price ASC`;
                }
                else {
                    query = Prisma.sql`SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${mainCategory.id} ORDER BY price ASC`;
                }
                plans = await prisma.$queryRaw(query);
                plans && plans.map((plan) => {
                    if (plan.categoryId && plan.categoryLabel && plan.categoryName) {
                        const obj = {
                            categoryId: plan.categoryId,
                            categoryLabel: plan.categoryLabel,
                            categoryName: plan.categoryName,
                        };
                        const exists = categories.find((cat) => cat.categoryId === obj.categoryId);
                        if (!exists) categories.push(obj);
                    }
                })
            }
            return {
                plans,
                mainCategory,
                categories
            }
        }
    }
}

export default resolvers;