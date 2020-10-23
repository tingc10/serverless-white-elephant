import { ApolloServer } from 'apollo-server-lambda';
import 'reflect-metadata';
import * as AWS from 'aws-sdk';
import {
  Arg,
  buildSchema,
  Field,
  ID,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';

@ObjectType()
class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  email: string;
}

@Resolver()
class UserResolver {
  private dynamoDb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

  @Query((_returns) => String)
  async getGreeting(@Arg('firstName') firstName: string) {
    const result = await this.dynamoDb
      .get({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { firstName },
      })
      .promise();
    const name = result.Item.nickname ?? result.Item;
    return `Hello, ${name}`;
  }

  @Mutation((_returns) => String)
  async changeNickname(
    @Arg('firstName') firstName: string,
    @Arg('nickname', { nullable: true }) nickname: string,
  ) {
    await this.dynamoDb
      .update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { firstName },
        UpdateExpression: 'SET nickname = :nickname',
        ExpressionAttributeValues: {
          ':nickname': nickname,
        },
      })
      .promise();
    return nickname;
  }
}

async function bootstrap(
  evt: APIGatewayProxyEvent,
  ctxt: Context,
  callback: Callback<APIGatewayProxyResult>,
) {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    orphanedTypes: [User],
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
  server.createHandler()(evt, ctxt, callback);
}

export function graphql(
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>,
): void {
  bootstrap(event, context, callback);
}
