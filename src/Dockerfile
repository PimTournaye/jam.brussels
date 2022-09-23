FROM node
WORKDIR /usr/src

COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE ${APP_PORT}

CMD ["npm", "run", "dev"]