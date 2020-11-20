import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.NODE_ENV === 'production' ? 'https://dummy-url.com' : 'http://localhost:3000';

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
})
