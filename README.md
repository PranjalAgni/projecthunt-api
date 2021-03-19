<h1 align="center">ProjectHunt API :sparkles: :sunflower: :seedling:</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## Setup Locally

1. Duplicate and rename .env.example to .env and provide all environment var

2. Provide right DB username,password,schema

## Running the server

#### Without Docker

```sh
npm i
npm run watch
```

- Open other terminal window and run dev server

```sh
npm run start:dev
```

#### With Docker

```sh
docker-compose up --build
```

If you get DB does not exists, simply run this:

```sh
sh scripts/sh/initdb.sh
```

## Scripts

1. seed - DB seed script, will insert dummy data
2. watch - Watcher, for changes in TS files
3. clean - Removes dist folder
4. build - Compiles TS files, and spits JS version
5. start - Start the server in prod mode
6. start:dev - Start the server in dev mode
7. lint - Lint the TS files with eslint

## Show your support

Give a ⭐️ if this project helped you!
