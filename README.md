# Welcome to fastify-starter 👋

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: jellydn](https://img.shields.io/twitter/follow/jellydn.svg?style=social)](https://twitter.com/jellydn)

> Fastify Typescript Starter

## Features

- Swagger documentation generator for Fastify https://github.com/fastify/fastify-swagger
- Generates swagger/openapi specification based on jsDoc comments and YAML files. https://github.com/Surnet/swagger-jsdoc
- Mercurius is a GraphQL adapter for Fastify https://mercurius.dev/
- Code-GraphQL Nexus
  Declarative, Code-First GraphQL Schemas for JavaScript/TypeScript https://nexusjs.org

## Install

```sh
yarn install
```

## Usage

```sh
yarn run start
```

## Swagger UI

http://localhost:3000/documentation

![https://gyazo.com/6cf6c02cb36f9d4fababdde1ad071aba.gif](https://gyazo.com/6cf6c02cb36f9d4fababdde1ad071aba.gif)

## GraphQL

Run below command in your terminal/CLI

```sh
curl -H "Content-Type:application/graphql" -XPOST -d "query { hello }" http://localhost:3000/graphql | jq .
```

Output:

```
{
  "data": {
    "hello": "Hello World!"
  }
}
```

## Run tests

```sh
yarn run test
```

## Deployment

This template comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  fly auth signup
  ```

- Create two apps on Fly, one for staging and one for production:

  ```sh
  fly create fastify-starter
  fly create fastify-starter-staging
  ```

- Create a new [GitHub Repository](https://repo.new)

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

Now that every is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Author

👤 **Huynh Duc Dung**

- Website: https://productsway.com/
- Twitter: [@jellydn](https://twitter.com/jellydn)
- Github: [@jellydn](https://github.com/jellydn)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
