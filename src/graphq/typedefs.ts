import { gql } from "apollo-server-express"


const typeDefs = gql`
    type Plan {
        id: ID!
        name: String!
        category: Int!
        price: Int!
        iconUrl: String!
        dataAmount: String!
        smsAmount: String!
        callAmount: String!
        dataIcon: String!
        smsIcon: String!
        callsIcon: String!
        subCategory: Int!
        categoryLabel: String
        categoryName: String
        categoryId: Int
    }
    type Category {
        categoryId: Int!
        categoryName: String!
        categoryLabel: String!
        mainCatId: Int!
    }
    type MainCategory {
      id: ID!
      name: String!
      internalName: String!
      altName: String!
      categories: [Category]
    }
    type PlansByNameAndCategories {
      plans: [Plan]
      categories: [Category]
      mainCategory: MainCategory
    }
  
  type Query {
    plansByName(categoryName: String, categoryId: Int): PlansByNameAndCategories
    mainCategories: [MainCategory]
    getCategories(mainCat: String): [Category]
  }
`

export default typeDefs;