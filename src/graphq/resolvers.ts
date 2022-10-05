import { PlanType } from "../../global";
import { prisma } from "../prismaClient";


const resolvers = {
    Query: {
        async plans(parent: any, args: any, context: any, info: any) {
            const { category } = args;


            const query = `SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${category} ORDER BY price ASC`;

            const mainCategories = await prisma.mainCategory.findMany();

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
        }
    }
}

export default resolvers;