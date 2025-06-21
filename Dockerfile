# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
