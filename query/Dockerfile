FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 4002

COPY . .

CMD ["npm", "start"]