FROM node:12-alpine

WORKDIR /app

COPY ./src /app/

RUN npm install

CMD [ "node", "index.js" ]