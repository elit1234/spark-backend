FROM node:16 AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm install

COPY . .

# TSC compilation
RUN npx tsc


#*** Bundle app source ***
FROM node:16
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

#Copy the distribution folder from build stage
COPY --from=build /usr/src/app/dist dist


EXPOSE 8111

#Prisma generation
RUN npx prisma generate
CMD [ "node", "dist/index.js" ]

