FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Install build dependencies for native modules (better-sqlite3, bcrypt, etc.)
RUN apk add --no-cache make gcc g++ python3

# Copy dependency definition files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt application
RUN npm run build

# Expose the default Nuxt port
EXPOSE 3030

# Start the application using the built Nitro server
CMD ["node", ".output/server/index.mjs"]
