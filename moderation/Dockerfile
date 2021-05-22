FROM node:alpine

WORKDIR /app

COPY package.json .

EXPOSE 4003

RUN npm install

COPY . .

CMD ["npm", "start"]