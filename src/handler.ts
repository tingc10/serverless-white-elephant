import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { getGreeting } from '@queries/getGreeting';

// Here we declare the schema and resolvers for the query
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType', // an arbitrary name
    fields: {
      // the query has a field called 'greeting'
      greeting: {
        // we need to know the user's name to greet them
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        // the greeting message is a string
        type: GraphQLString,
        // resolve to a greeting message
        resolve: (_, args) => getGreeting(args.firstName),
      },
    },
  }),
});

// modern module syntax
export const query: APIGatewayProxyHandler = async (event) => {
  try {
    const result = await graphql(schema, event.queryStringParameters.query);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    return err;
  }
};
