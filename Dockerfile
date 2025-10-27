
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


RUN npm run build


EXPOSE 3000


CMD [ "npm", "run", "preview" ]