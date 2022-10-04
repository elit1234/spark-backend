"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const BASE_URL = 'https://myapp.com/';
function fetchResponseByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}
function fetchPeople() {
    return fetchResponseByURL('/people/').then(json => json.people);
}
function fetchPersonByURL(relativeURL) {
    return fetchResponseByURL(relativeURL).then(json => json.person);
}
const PersonType = new graphql_1.GraphQLObjectType({
    name: 'Person',
    description: 'Somebody that you used to know',
    fields: () => ({
        firstName: {
            type: graphql_1.GraphQLString,
            resolve: person => person.first_name,
        },
        lastName: {
            type: graphql_1.GraphQLString,
            resolve: person => person.last_name,
        },
        email: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
        username: { type: graphql_1.GraphQLString },
        friends: {
            type: new graphql_1.GraphQLList(PersonType),
            resolve: person => person.friends.map(fetchPersonByURL),
        },
    }),
});
const QueryType = new graphql_1.GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
        allPeople: {
            type: new graphql_1.GraphQLList(PersonType),
            resolve: fetchPeople,
        },
        person: {
            type: PersonType,
            args: {
                id: { type: graphql_1.GraphQLString },
            },
            resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`),
        },
    }),
});
exports.default = new graphql_1.GraphQLSchema({
    query: QueryType
});
