import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
// import { User } from './object-types';
import {
  DynamoDBConnectionManager,
  DynamoDBEventProcessor,
  DynamoDBEventStore,
  DynamoDBSubscriptionManager,
  PubSub,
  Server,
} from 'aws-lambda-graphql';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { GiftResolver, RoomResolver, UserResolver } from './resolvers';
import { awsClient } from './utils/aws-client';

const eventStore = new DynamoDBEventStore({
  dynamoDbClient: awsClient,
});
const eventProcessor = new DynamoDBEventProcessor();
const subscriptionManager = new DynamoDBSubscriptionManager({
  dynamoDbClient: awsClient,
});
const connectionManager = new DynamoDBConnectionManager({
  apiGatewayManager: process.env.IS_OFFLINE
    ? new ApiGatewayManagementApi({
        endpoint: 'http://localhost:3001',
      })
    : undefined,
  dynamoDbClient: awsClient,
  subscriptions: subscriptionManager,
});
const pubSub = new PubSub({ eventStore });
const serverPlaygroundOptions = process.env.IS_OFFLINE
  ? {
      playground: {
        subscriptionEndpoint: 'ws://localhost:3001',
      },
    }
  : {};

const schema = buildSchemaSync({
  resolvers: [UserResolver, RoomResolver, GiftResolver],
  // orphanedTypes: [User],
});

const server = new Server({
  schema,
  // accepts all the apollo-server-lambda options and adds few extra options
  // provided by this package
  context: ({ event }) => ({
    headers: event.headers,
    event,
    pubSub,
  }),
  connectionManager,
  eventProcessor,
  subscriptionManager,
  ...serverPlaygroundOptions,
});

export const handleHttp = server.createHttpHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
export const handleWebSocket = server.createWebSocketHandler();
export const handleDynamoDBStream = server.createEventHandler();
