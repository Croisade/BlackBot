FROM node:12-alpine

RUN mkdir -p /app

ADD package.json /user/src/app

COPY . /app

WORKDIR /app
ENV SHELL /bin/bash
ARG GITHUB_TOKEN_ARG
ENV GITHUB_TOKEN $GITHUB_TOKEN_ARG

RUN apk add --no-cache bash

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  ffmpeg \
  vim \
  curl \
  jq \
  g++ \
  && npm install \
  && apk del .gyp

RUN npm run build

ENV PORT 3000
EXPOSE $PORT

CMD ["npm", "run", "start"]
