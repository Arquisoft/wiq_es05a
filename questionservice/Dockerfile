# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/questionservice

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

#Create an optimized version of the webapp
RUN npm install axios

# Install app dependencies
RUN npm install

# Copy the app source code to the working directory
COPY . . /usr/src/questionservice/

# Define the command to run your app
CMD ["node", "server.js"]
