FROM node:18-alpine3.16

LABEL description="This service is the user interface of the application, where the user is shown the different services that can be offered."

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]