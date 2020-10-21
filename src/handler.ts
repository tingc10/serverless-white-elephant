import { ApolloServer, gql, IResolvers } from 'apollo-server-lambda';
import { getGreeting } from '@queries/getGreeting';
import * as AWS from 'aws-sdk';

const typeDefs = gql`
  type Query {
    getGreeting(firstName: String!): String
  }

  type Mutation {
    changeNickname(firstName: String!, nickname: String!): String
  }

  type User {
    id: ID!
    firstName: String!
    email: String!
  }
`;

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const resolvers: IResolvers = {
  Query: {
    getGreeting: (),
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    dynamoDb,
  }),
});

export const graphql = server.createHandler();
