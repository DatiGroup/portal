FROM node:22.19-alpine

WORKDIR /app/projects/DigitalTwinsFrontend

RUN npm install --global --force yarn

RUN corepack enable

RUN yarn set version 4.9.1

COPY . .

EXPOSE 5173