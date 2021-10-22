FROM node:14.15.4-alpine3.11
WORKDIR /gettogetherfrontend
ADD . .
RUN npm install
CMD npm start