# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional, using default for now)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]