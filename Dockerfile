FROM node:8
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
WORKDIR /usr/src/app/server
RUN npm install
CMD [ "npm", "start" ]
