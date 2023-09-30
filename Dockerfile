FROM node:18-alpine3.16  AS staging-build

WORKDIR /app

COPY ["package*.json", "./"]

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine3.16

WORKDIR /app

COPY ["package*.json", "tsconfig*.json", "./"]

RUN npm install

COPY --from=staging-build /app/build ./build

CMD ["npm", "run", "start:prod"]

EXPOSE 8282