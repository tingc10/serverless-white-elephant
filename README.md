This is the root of a serverless app whose dependencies are managed with yarn workspaces.

To install, run yarn install on this directory and all appropriate dependencies will be installed for the children directories as well.

To generate Graphql Types, switch to the server directory, boot up the server with:

```
yarn start:offline
```

Then in the client directory, run:

```
yarn graphql:codegen
```