# Use an official Node runtime as a parent image
FROM node:14.17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of your application files to the container
COPY . .

# Define the command to run your application
CMD ["npm", "run", "dev"]
