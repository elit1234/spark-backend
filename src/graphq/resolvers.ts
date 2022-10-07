import { PlanType } from "../../global";
import { prisma } from "../prismaClient";


const resolvers = {
    Query: {
        async mainCategories() {
            const mainCategories = await prisma.mainCategory.findMany({
                orderBy: {
                    id: "asc"
                }
            });
            return mainCategories
        },
        async plans(parent: any, args: any, context: any, info: any) {
            const { category } = args;


            const query = `SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${category} ORDER BY price ASC`;

            const mainCategories = await prisma.mainCategory.findMany({
                orderBy: {
                    id: "desc"
                }
            });

            const plans: PlanType[] = await prisma.$queryRawUnsafe(query)

            let categories: any[] = [];
            plans && plans.map((plan) => {
                if (plan.categoryId && plan.categoryLabel && plan.categoryName) {
                    const obj = {
                        id: plan.categoryId,
                        label: plan.categoryLabel,
                        name: plan.categoryName,
                    };
                    const exists = categories.find((cat) => cat.id === plan.id);
                    if (!exists) categories.push(obj);
                }
            })
            return {
                plans,
                mainCategories,
                categories
            }
        },
        async plansByName(parent: any, args: any, context: any, info: any) {
            const { categoryName } = args;
            console.log("categoryName: " + categoryName)
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
                console.log(mainCategory)
                const query = `SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${mainCategory.id} ORDER BY price ASC`;
                console.log(query);
                plans = await prisma.$queryRawUnsafe(query);
                plans && plans.map((plan) => {
                    if (plan.categoryId && plan.categoryLabel && plan.categoryName) {
                        const obj = {
                            id: plan.categoryId,
                            label: plan.categoryLabel,
                            name: plan.categoryName,
                        };
                        const exists = categories.find((cat) => cat.id === plan.id);
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