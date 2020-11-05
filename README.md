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

## TODO
- [x] Setup serverless with webpack
- [x] Setup type-graphql
- [x] Figure out DynamoDB structure
- [ ] Implement game mechanics
- [ ] Setup Auth0

## Features
- [ ] Can create user with nickname
- [ ] Host can create room with name. Room generates with a room code
- [ ] Host can start game -> generates turn tokens and sets turn index
- [ ] User can input gift with gift name, url, description, image url
- [ ] User should be able to fetch all gifts in the room and identify the one they submitted