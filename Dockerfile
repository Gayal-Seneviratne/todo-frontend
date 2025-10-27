
FROM node:20-slim


WORKDIR /app


COPY package*.json ./

# Configure npm with increased timeout and retry settings
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-timeout 600000 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm config set fetch-retry-maxtimeout 60000 && \
    npm config set fetch-retries 5

RUN npm install --verbose


COPY . .

# Accept build argument for API URL (passed from docker-compose)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


EXPOSE 3000


CMD [ "npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000" ]