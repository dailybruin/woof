FROM node:18.17.0

# Create app directory, setting the working directory inside the container
WORKDIR /app

# Copying the package.json and package-lock.json files into the container
COPY package.json package-lock.json ./

# Installing the dependencies
RUN npm install

# Copying the remainder of the application code into the container
COPY . . 

# RUN npm run build

# Exposing the port 3000
EXPOSE 3000

# Providing command to run the application
CMD npm run dev