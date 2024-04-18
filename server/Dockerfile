FROM node:20-alpine AS node

WORKDIR /root/server/

COPY package*.json ./

RUN npm ci

ADD . .

RUN npm run build

CMD ["node", "./dist/main.js"]