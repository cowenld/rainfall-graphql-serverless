# Bike Park Rainfall Map

https://zen-shockley-16d687.netlify.app/

Leaflet map with historical rainfall data from the https://environment.data.gov.uk based on bike park co-ordinates which are stored on faundaDB. Uses graphql apollo server and client.

- Leaflet
- Create React App
- Graphql Apollo Server Lambda & Client
- faunaDB

## [Create-React-App-Lambda](https://github.com/netlify/create-react-app-lambda)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/create-react-app-lambda&utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex)

## Project Setup

**Source**: The main addition to base [Create-React-App](https://github.com/facebook/create-react-app) is a new folder: `src/lambda`. This folder is specified and can be changed in the `package.json` script: `"build:lambda": "netlify-lambda build src/lambda"`.

**Dist**: Each JavaScript file in there will be built for Netlify Function deployment in `/built-lambda`, specified in [`netlify.toml`](https://www.netlify.com/docs/netlify-toml-reference/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex).

For example, `src/lambda/hello.js` which will be deployed to `/.netlify/functions/hello`.

## Local Development

```bash
## prep steps for first time users
npm i -g netlify-cli # Make sure you have the [Netlify CLI](https://github.com/netlify/cli) installed
git clone https://github.com/netlify/create-react-app-lambda ## clone this repo
cd create-react-app-lambda ## change into this repo
yarn # install all dependencies

## done every time you start up this project
ntl dev ## nice shortcut for `netlify dev`, starts up create-react-app AND a local Node.js server for your Netlify functions
```

This fires up [Netlify Dev](https://www.netlify.com/docs/cli/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex#netlify-dev-beta), which:

- Detects that you are running a `create-react-app` project and runs the npm script that contains `react-scripts start`, which in this project is the `start` script
- Detects that you use `netlify-lambda` as a [function builder](https://github.com/netlify/netlify-dev-plugin/#function-builders-function-builder-detection-and-relationship-with-netlify-lambda), and runs the npm script that contains `netlify-lambda build`, which in this project is the `build:lambda` script.

You can view the project locally via Netlify Dev, via `localhost:8888`.

Each function will be available at the same port as well:

- `http://localhost:8888/.netlify/functions/hello` and
- `http://localhost:8888/.netlify/functions/async-dadjoke`

If modifications are needed to FaunaDB, you will have to obtain a key and add the secret to your `.env` file using

- `FAUNA=`

as show in the `.env.template`.

## Deployment

During deployment, this project is configured, inside `netlify.toml` to run the build `command`: `yarn build`.

`yarn build` corresponds to the npm script `build`, which uses `npm-run-all` (aka `run-p`) to concurrently run `"build:app"` (aka `react-scripts build`) and `build:lambda` (aka `netlify-lambda build src/lambda`).

## Typescript

<details>
  <summary>
    <b id="typescript">Click for instructions</b>
  </summary>

You can use Typescript in both your frontend React code (with `react-scripts` v2.1+) and your serverless functions (with `netlify-lambda` v1.1+). Follow these instructions:

1. `yarn add -D typescript @types/node @types/react @types/react-dom @babel/preset-typescript @types/aws-lambda`
2. convert `src/lambda/hello.js` to `src/lambda/hello.ts`
3. use types in your event handler:

```ts
import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";

interface HelloResponse {
  statusCode: number;
  body: string;
}

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const params = event.queryStringParameters;
  const response: HelloResponse = {
    statusCode: 200,
    body: JSON.stringify({
      msg: `Hello world ${Math.floor(Math.random() * 10)}`,
      params,
    }),
  };

  callback(undefined, response);
};

export { handler };
```

rerun and see it work!

You are free to set up your `tsconfig.json` and `tslint` as you see fit.

</details>

**If you want to try working in Typescript on the client and lambda side**: There are a bunch of small setup details to get right. Check https://github.com/sw-yx/create-react-app-lambda-typescript for a working starter.

## Choices

### [Domain-oriented Graphql](https://github.com/betaflag/graphql-server-scaffolding)

Organised files by business domain. Bike Parks folder contains all its resolvers, data, models. The principal benefit of this structure is its modularity. For me I find projects like this easier to navigate at scale.

### [Apollo Client](https://github.com/apollographql/apollo-client) and [Apollo Server Lambda](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-lambda)

Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

### [FaunaDB](https://github.com/fauna/faunadb-js)

Fauna is the data API for client-serverless applications. Fauna transforms the traditional DBMS into a Data API that gives you all of the capabilities of an old-guard database, without sacrificing flexibility, scale, and performance.

for local development you will need the faunaDB key.

### [React Leaflet](https://react-leaflet.js.org/)

Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.
