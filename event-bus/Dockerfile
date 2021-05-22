FROM node:alpine

WORKDIR /app

COPY package.json .

EXPOSE 4005

RUN npm install

COPY . .

CMD ["npm", "start"]