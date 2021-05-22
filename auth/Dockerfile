FROM node:alpine

WORKDIR /app

COPY package.json .

EXPOSE 4009

RUN npm install

COPY . .

CMD ["npm", "start"]