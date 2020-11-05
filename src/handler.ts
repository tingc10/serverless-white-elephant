import { ApolloServer } from 'apollo-server-lambda';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';
// import { User } from './object-types';
import { RoomResolver, UserResolver } from './resolvers';

async function bootstrap(
  evt: APIGatewayProxyEvent,
  ctxt: Context,
  callback: Callback<APIGatewayProxyResult>,
) {
  const schema = await buildSchema({
    resolvers: [UserResolver, RoomResolver],
    // orphanedTypes: [User],
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
