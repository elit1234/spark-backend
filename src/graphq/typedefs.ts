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
        id: Int!
        label: String!
        name: String!
    }
    type MainCategory {
      id: ID!
      name: String!
      internalName: String!
      categories: [Category]
    }
    type PlansAndCategories {
      plans: [Plan]
      categories: [Category]
      mainCategories: [MainCategory]
    }
  
  type Query {
    plans(category: Int): PlansAndCategories
    mainCategories: [MainCategory]
  }
`

export default typeDefs;