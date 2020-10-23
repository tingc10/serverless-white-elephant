import { ApolloServer } from 'apollo-server-lambda';
import 'reflect-metadata';
import * as AWS from 'aws-sdk';
import {
  Arg,
  buildSchema,
  Field, ID, Mutation, ObjectType, Query, Resolver,
} from 'type-graphql';

// const typeDefs = gql`
//   type Query {
//     getGreeting(firstName: String!): String
//   }

//   type Mutation {
//     changeNickname(firstName: String!, nickname: String!): String
//   }

//   type User {
//     id: ID!
//     firstName: String!
//     email: String!
//   }
// `;
// const resolvers: IResolvers = {
//   Query: {
//     getGreeting: (),
//   },
// };
@ObjectType()
class User {
  @Field(_type => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  email: string;
}

@Resolver(User)
class UserResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

  @Query(_returns => String)
  async getGreeting(@Arg('firstName') firstName: string) {
    const result = await this.dynamoDb.get({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { firstName },
    }).promise();
    const name = result.Item.nickname ?? result.Item;
    return `Hello, ${name}`;
  }

  @Mutation(_returns => String)
  async changeNickname(
    @Arg('firstName') firstName: string,
    @Arg('nickname', { nullable: true }) nickname: string,
  ) {
    await this.dynamoDb.update({
      TableName: process.env.DYNAMODB_TABLE,
      Key: { firstName },
      UpdateExpression: 'SET nickname = :nickname',
      ExpressionAttributeValues: {
        ':nickname': nickname,
      },
    }).promise();
    return nickname;
  }
}

export const graphql = async (): Promise<ReturnType<typeof server.createHandler>> => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
  });
  return server.createHandler();
};
