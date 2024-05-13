FROM node:20-alpine
RUN apk update && apk add --no-cache chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main
RUN apk add  --no-cache ffmpeg
WORKDIR /usr/src/app
COPY package*.json index.js ./
RUN npm install
EXPOSE 3000
CMD [ "node", "index.js" ]