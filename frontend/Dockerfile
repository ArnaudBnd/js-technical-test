# Use the official Node.js image
FROM node:18.18.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Command to run the app
CMD ["npm", "run", "dev"]
