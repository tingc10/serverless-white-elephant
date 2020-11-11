Serverless backend to power white elephant gift exchange

## Resources
- https://www.serverless.com/framework/docs/getting-started/
- https://www.serverless.com/plugins/serverless-plugin-typescript
- https://www.serverless.com/blog/make-serverless-graphql-api-using-lambda-dynamodb
- https://dev.to/michael_timbs/get-started-with-aws-serverless-and-typescript-5hgf
- https://www.serverless.com/learn/tutorial/integrate-auth0-into-frontend/
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html
- https://serverlessfirst.com/dynamodb-modelling-single-vs-multi-table/
- https://www.jeremydaly.com/how-to-switch-from-rdbms-to-dynamodb-in-20-easy-steps/
- https://medium.com/quick-code/node-js-restful-api-with-dynamodb-local-7e342a934a24
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html
- https://www.serverless.com/learn/courses/serverless-for-frontend-developers/
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

## TODO
- [x] Setup serverless with webpack
- [x] Setup type-graphql
- [x] Figure out DynamoDB structure
- [ ] Implement game mechanics
- [ ] Setup Auth0
- [ ] Use [ProjectionExpression](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ProjectionExpressions.html) to limit the return values from DynamoDB
- [ ] Use [Global Secondary Indexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html) to create indexes

## Features
- [x] Can create user
- [x] Can update user 
- [x] Host can create room with name. Room generates with a room code
- [x] User can input gift with gift name, url, description, image url
- [ ] User can fetch all users and gifts in a room
- [ ] Host can start game -> generates turn tokens and sets turn index
- [ ] User should be able to fetch all gifts in the room and identify the one they submitted