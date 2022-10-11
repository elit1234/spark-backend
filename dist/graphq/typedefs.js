"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
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
    type PlansAndCategories {
      plans: [Plan]
      categories: [Category]
      mainCategories: [MainCategory]
    }
    type PlansByNameAndCategories {
      plans: [Plan]
      categories: [Category]
      mainCategory: MainCategory
    }
  
  type Query {
    plans(category: Int): PlansAndCategories
    plansByName(categoryName: String): PlansByNameAndCategories
    mainCategories: [MainCategory]
    getCategories(mainCat: String): [Category]
  }
`;
exports.default = typeDefs;
