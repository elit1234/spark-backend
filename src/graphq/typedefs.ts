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
  
  type Query {
    plans: Plan
  }
`

export default typeDefs;