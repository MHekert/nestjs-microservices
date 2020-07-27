## Installation

```bash
$ yarn install
$ cp .env.example .env
```

## Start container

```bash
$ yarn start:container
```

## Stop container

```bash
$ yarn stop:container
```

## Running the app

```bash
# development
$ yarn run start edge
$ yarn run start auth
$ yarn run start mailer
$ yarn run start sockets

# watch mode
$ yarn run start:dev edge
$ yarn run start:dev auth
$ yarn run start:dev mailer
$ yarn run start:dev sockets

# production mode
$ yarn run start:prod:edge
$ yarn run start:prod:auth
$ yarn run start:prod:mailer
$ yarn run start:prod:sockets
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
