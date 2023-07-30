FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY src ./src
COPY tsconfig.json ./

CMD npm run build && npm start
