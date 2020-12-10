import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = true ? 'https://3mv50mw2yk.execute-api.us-east-1.amazonaws.com/dev/' : 'http://localhost:3000/dev';

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  
})
