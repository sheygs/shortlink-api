### shortlink-api

> ShortLink is a URL shortening service.

### Overview

ShortLink is a URL shortening service where you enter a URL such as `https://indicina.co` and it returns
a short URL such as `http://short.est/GeAi9K`. Visiting the shortened URL should redirect the user to the
long URL. Using the example above, visiting `http://short.est/GeAi9K` should redirect the user to `https://indicina.co`

### Features

- `encode`: Encode a URL to a shortened URL
- `decode`: Decodes a shortened URL to its original URL
- `statistic/{url_path}`: Return the basic statistics of a short URL path. Using the above link, `url_path` will be `GeAi9K`.

### Project Structure

Overall, the project is designed to be scalable, maintainable and extensible. The use of a monolithic architecture that can easily spin off to a micro-service following modular architecture pattern that promotes code organization and separation of concerns.

### Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/download/current)
- [Express](https://www.npmjs.com/package/express)
- [Jest](https://www.npmjs.com/package/jest)

### Requirements

- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/downloads/)
- [Git](https://git-scm.com/downloads)

### Rename _.env.sample_ to _.env_ and replace the placeholders

```bash
PORT=8282
NODE_ENV=development
```

### Postman Documentation

- Navigate to `http://localhost:8282/api-docs` on your computer to view the openapi documentation.

### Installation 📦

#### Without Docker

```bash
   $ git clone https://github.com/sheygs13/shortlink-api.git
   $ cd shortlink-api
   $ npm install
```

- Run `npm install` to install project dependencies
- Run `npm run dev` to run the services and you are good
- Open browser and visit `http://localhost:8282` and rock it

#### Docker

- Install [Docker](https://www.docker.com/)
- Run `docker-compose up -d db`. But If you like to see those clumsy logs 😬, RUN `docker-compose up`
- Open browser and visit `http://localhost:8282` and rock it

### Production Packaging

- RUN `npm run prod` to start the production build

```
docker build -t ${IMAGETAG} -f Dockerfile .
```

### Test

```bash
   $ npm test
```
