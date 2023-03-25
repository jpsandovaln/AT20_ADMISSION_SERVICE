#Telling Docker to use the node image version 18-alpine3.16 as the base image for the container.
FROM node:18-alpine3.16

#Telling Docker to create a directory called app in the container and set it as the working directory.
WORKDIR /app

#Copying the package.json and package-lock.json files from the current directory to the working directory in the container.
COPY package*.json ./

#Installing the dependencies listed in the package.json file.
RUN npm install

#Copying all the files from the current directory to the working directory in the container.
COPY . .

#Telling Docker that the container listens on the specified network ports at runtime.
EXPOSE 3000

#Telling Docker to run the npm start command when the container starts.
CMD ["npm", "start"]