#Build image

FROM node:16.13-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci --quit

COPY ./prisma prisma
COPY . .


#prisma generation
RUN npx prisma generate
# TSC compilation

RUN npx tsc


#Production image
FROM node:16.13-alpine
WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci --only=production --quiet


#Copy the prisma folder
COPY --chown=node:node --from=build /usr/src/app/prisma prisma
#Copy the distribution folder from build stage
COPY --from=build /usr/src/app/dist dist

USER node

EXPOSE 8111

CMD [ "node", "dist/index.js" ]

