# BlazeHub Backend

![DEV](https://github.com/elishaking/blazehub-nestjs/workflows/DEV/badge.svg)

BlazeHub Backend written in NestJS.

Frontend code is available here: https://github.com/elishaking/blazehub-frontend

Production App is available here: https://blazehub.skyblazar.com

## Setup

### Requirements

These are some of the software required to run this application:

- Nodejs `(>= 10.x.x)`
- Yarn `(>= 1.x.x)`

### Installation

These are the steps to get the app up and running

- Set up the environment variables:

  ```sh
  cp .env.example .env
  ```

- Install dependencies
  ```sh
  yarn install
  ```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Testing the app

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

- Checkout [package.json](package.json) for other helpful scripts.
