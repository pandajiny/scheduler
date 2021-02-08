FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY ./dist .
COPY .env .

EXPOSE 5000

CMD ["node","main.js"]