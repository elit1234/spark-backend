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
  
  type Query {
    plans: Plan
  }
`;
exports.default = typeDefs;
